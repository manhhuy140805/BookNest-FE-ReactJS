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
import Footer from "../../components/layout/Footer/Footer";
import BookCard from "../../components/common/bookCard/BookCard";
import * as favoritesService from "../../services/favorites";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Favorites.module.css";

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
  const [showAddButton, setShowAddButton] = useState(true);
  const itemsPerPage = 20;

  // Handle scroll to hide button near footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Hide button when within 300px of bottom
      if (docHeight - (scrollTop + winHeight) < 300) {
        setShowAddButton(false);
      } else {
        setShowAddButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      setFavorites(response.data.favoriteBooks || []);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load favorites";
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

  // Get list of favorite IDs for BookCard component
  const favoriteIds = useMemo(() => {
    return favorites.map((book) => book.id);
  }, [favorites]);

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleRemoveFavorite = async (bookId) => {
    try {
      await favoritesService.removeFavorite(bookId);
      message.success("Book removed from favorites");

      // Reload favorites list from API
      fetchFavorites();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to remove book from favorites";
      setError(errorMsg);
      message.error(errorMsg);
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div className={styles["favorites-page-wrap"]}>
      <Header />

      <section className={styles["favorites-hero"]}>
        <h1>Favorite Books</h1>
        <p>Your collection of favorite reads</p>
      </section>

      <main
        className={styles["favorites-content-container"]}
        style={{ paddingLeft: "70px", paddingRight: "70px" }}
      >
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

        {/* Search Header */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Search books..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ flex: 1, maxWidth: "400px" }}
            allowClear
          />
        </div>

        {/* Fixed Add Book Button */}
        {showAddButton && (
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/books")}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              backgroundColor: "#ff4d4f",
              borderColor: "#ff4d4f",
              zIndex: 50,
              borderRadius: "50%",
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 4px 12px rgba(255, 77, 79, 0.3)",
              opacity: 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            +
          </Button>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <Spin size="large" description="Loading favorite books..." />
          </div>
        ) : (
          <Row gutter={[20, 20]}>
            {/* Main Content - Full Width */}
            <Col xs={24}>
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
                  <div className={styles["favorites-list-wrap"]}>
                    <Row gutter={[16, 24]}>
                      {displayedFavorites.map((book) => (
                        <Col
                          key={book.id}
                          xs={24}
                          sm={12}
                          md={8}
                          lg={5}
                          style={{ minWidth: "20%", maxWidth: "20%" }}
                        >
                          <BookCard
                            book={book}
                            onRemoveFavorite={handleRemoveFavorite}
                            favoriteIds={favoriteIds}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className={styles["favorites-pagination-container"]}>
                      <Pagination
                        current={currentPage}
                        total={totalBooks}
                        pageSize={itemsPerPage}
                        onChange={(page) => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        showSizeChanger={false}
                        showQuickJumper
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

      <Footer />
    </div>
  );
}
