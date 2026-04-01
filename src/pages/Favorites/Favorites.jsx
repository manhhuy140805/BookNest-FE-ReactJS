import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Button,
  Spin,
  Empty,
  Alert,
  Pagination,
  message,
  Modal,
  Input,
  Select,
} from "antd";
import {
  HeartFilled,
  SearchOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import Header from "../../components/layout/Header";
import BookCard from "../../components/common/bookCard/BookCard";
import * as favoritesService from "../../services/favorites";
import { useAuth } from "../../hooks/useAuth";
import "./Favorites.css";

const { Content } = Layout;

const sortOptions = [
  { label: "Default Sorting", value: "default" },
  { label: "Newest", value: "newest" },
];

const categoryOptions = [
  "Philosophy",
  "Psychology",
  "Technology",
  "Fantasy",
  "Self-Help",
];

export default function Favorites() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeCategories, setActiveCategories] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const itemsPerPage = 12;

  // Kiểm tra xác thực khi component mount
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        setShowAuthModal(true);
      } else {
        fetchFavorites();
      }
    }
  }, [authLoading, isAuthenticated]);

  const toolbarResultText = useMemo(() => {
    const keywordSuffix = searchInput.trim()
      ? ` for "${searchInput.trim()}"`
      : "";
    return `Book list${keywordSuffix}`;
  }, [searchInput]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await favoritesService.getFavorites();
      console.log("Fetched favorites:", response.data);
      setFavorites(response.data.favoriteBooks || []);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Không thể tải danh sách yêu thích";
      setError(errorMsg);
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort logic
  const filteredBooks = useMemo(() => {
    let result = favorites;

    // Filter by search
    if (searchInput.trim()) {
      const query = searchInput.toLowerCase();
      result = result.filter(
        (book) =>
          book.title?.toLowerCase().includes(query) ||
          book.author?.toLowerCase().includes(query),
      );
    }

    // Filter by categories
    if (activeCategories.length > 0) {
      result = result.filter((book) =>
        activeCategories.includes(book.category),
      );
    }

    // Sort
    if (sortBy === "rating_desc") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }

    return result;
  }, [favorites, searchInput, activeCategories, sortBy]);

  // Pagination logic
  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedFavorites = filteredBooks.slice(
    startIdx,
    startIdx + itemsPerPage,
  );

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleRemoveFavorite = async (bookId) => {
    try {
      await favoritesService.removeFavorite(bookId);

      // Update local state
      setFavorites(favorites.filter((book) => book.id !== bookId));
      message.success("Đã xóa sách khỏi danh sách yêu thích");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Không thể xóa sách khỏi danh sách yêu thích";
      setError(errorMsg);
      message.error(errorMsg);
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div className="favorites-page-wrap">
      <Header />

      <section className="favorites-hero">
        <h1>Favorite Books</h1>
        <p>Your collection of favorite reads</p>
      </section>

      <main className="favorites-content-container">
        {/* Error Alert */}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: "20px" }}
          />
        )}

        {/* Toolbar */}
        <div className="favorites-toolbar">
          <span>{toolbarResultText}</span>

          <Select
            value={sortBy}
            onChange={(value) => {
              setSortBy(value);
            }}
            options={sortOptions}
            className="favorites-sort-select"
          />

          <div className="favorites-toolbar-icons" aria-hidden>
            <Button
              type={viewMode === "grid" ? "primary" : "default"}
              icon={<AppstoreOutlined />}
              onClick={() => handleViewChange("grid")}
              style={{
                fontWeight: viewMode === "grid" ? "bold" : "normal",
                borderColor: viewMode === "grid" ? "#ff4d4f" : "#d9d9d9",
                backgroundColor: viewMode === "grid" ? "#fff1f0" : "#ffffff",
              }}
            />
            <Button
              type={viewMode === "list" ? "primary" : "default"}
              icon={<BarsOutlined />}
              onClick={() => handleViewChange("list")}
              style={{
                fontWeight: viewMode === "list" ? "bold" : "normal",
                borderColor: viewMode === "list" ? "#ff4d4f" : "#d9d9d9",
                backgroundColor: viewMode === "list" ? "#fff1f0" : "#ffffff",
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <Spin size="large" tip="Loading favorite books..." />
          </div>
        ) : (
          <Row gutter={[20, 20]}>
            {/* Sidebar */}
            <Col xs={24} lg={7} xl={6}>
              <aside className="favorites-sidebar">
                <div className="favorites-filter-block">
                  <h3>Search</h3>
                  <Input
                    allowClear
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search for books..."
                    suffix={<SearchOutlined />}
                  />
                </div>

                <div className="favorites-filter-block">
                  <h3>Categories</h3>
                  <div className="favorites-category-list">
                    {categoryOptions.map((category) => {
                      const isActive = activeCategories.includes(category);
                      return (
                        <Button
                          key={category}
                          type={isActive ? "primary" : "default"}
                          onClick={() => {
                            setActiveCategories((prev) => {
                              if (prev.includes(category)) {
                                return prev.filter(
                                  (value) => value !== category,
                                );
                              }
                              return [...prev, category];
                            });
                          }}
                        >
                          {category}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </Col>

            {/* Main Content */}
            <Col xs={24} lg={17} xl={18}>
              {filteredBooks.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No favorite books found"
                  >
                    <Button type="primary" onClick={() => navigate("/")}>
                      Explore Books
                    </Button>
                  </Empty>
                </div>
              ) : (
                <>
                  <div className="favorites-list-wrap">
                    <Row gutter={[16, 24]}>
                      {displayedFavorites.map((book) => (
                        <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
                          <BookCard
                            book={book}
                            onRemoveFavorite={handleRemoveFavorite}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="favorites-pagination-container">
                      <Pagination
                        current={currentPage}
                        total={totalBooks}
                        pageSize={itemsPerPage}
                        onChange={(page) => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        showSizeChanger={false}
                      />
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        )}
      </main>

      {/* Authentication Modal */}
      <Modal
        title="Login Required"
        open={showAuthModal}
        closable={false}
        okText="Login"
        cancelText="Back to Home"
        onOk={() => navigate("/login")}
        onCancel={() => navigate("/")}
      >
        <p>You need to login to view your favorite books.</p>
      </Modal>
    </div>
  );
}
