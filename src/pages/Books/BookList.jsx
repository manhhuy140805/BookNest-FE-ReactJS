import { useMemo, useState, useEffect } from "react";
import {
  Checkbox,
  Col,
  Input,
  Row,
  Select,
  Space,
  Button,
  Spin,
  Empty,
  Alert,
} from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";
import Header from "../../components/layout/Header";
import "./BookList.css";
import apiClient from "../../config/api";
import Footer from "../../components/layout/Footer/Footer";
import { Pagination } from "antd";
import GridView from "./components/GridView";
import { getFavorites } from "../../services/favorites";
import ListView from "./components/ListView";
import { useAuth } from "../../hooks/useAuth";

const sortOptions = [
  { label: "Default Sorting", value: "default" },
  { label: "Top Rated", value: "rating_desc" },
  { label: "Newest", value: "newest" },
];

const categoryOptions = [
  "Philosophy",
  "Psychology",
  "Technology",
  "Fantasy",
  "Self-Help",
];

const renderRatingStars = (starCount) => {
  return (
    <span className="books-review-stars" aria-label={`${starCount} stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarFilled
          key={`${starCount}-${index}`}
          className={index < starCount ? "active" : "inactive"}
        />
      ))}
    </span>
  );
};

export default function BookList() {
  const { isAuthenticated } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeRatings, setActiveRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 16;
  const [viewMode, setViewMode] = useState("grid");
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [reviewBuckets, setReviewBuckets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get("/book");
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Định dạng dữ liệu không hợp lệ");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Không thể tải danh sách sách",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Fetch favorite books on mount (only if authenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const fetchFavoriteIds = async () => {
      try {
        const response = await getFavorites();

        // API returns {id, fullName, favoriteBooks: [...]}
        if (
          response?.data?.favoriteBooks &&
          Array.isArray(response.data.favoriteBooks)
        ) {
          const ids = response.data.favoriteBooks.map((fav) => fav.id);
          setFavoriteIds(ids);
        }
      } catch (error) {
        console.error("❌ Failed to fetch favorites:", error.message);
      }
    };

    fetchFavoriteIds();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/category");
        if (Array.isArray(response.data)) {
          const categoryNames = response.data.map((cat) => cat.name);
          setCategories(categoryNames);
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          const categoryNames = response.data.data.map((cat) => cat.name);
          setCategories(categoryNames);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, activeCategories, activeRatings]);

  // Calculate review buckets from books data
  useEffect(() => {
    if (books.length > 0) {
      const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      books.forEach((book) => {
        const rating = Math.round(book.rating || 0);
        if (rating >= 1 && rating <= 5) {
          counts[rating]++;
        }
      });

      const buckets = [
        { value: 5, count: counts[5] },
        { value: 4, count: counts[4] },
        { value: 3, count: counts[3] },
        { value: 2, count: counts[2] },
        { value: 1, count: counts[1] },
      ];

      setReviewBuckets(buckets);
    }
  }, [books]);

  const handleRemoveFavorite = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  // Filter books based on active criteria
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Filter by search input
      if (searchInput.trim()) {
        const searchLower = searchInput.toLowerCase();
        const matchesSearch =
          book.title?.toLowerCase().includes(searchLower) ||
          book.author?.toLowerCase().includes(searchLower) ||
          book.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Filter by categories
      if (activeCategories.length > 0) {
        const bookCategory = book.category?.name || book.categoryName;
        if (!activeCategories.includes(bookCategory)) return false;
      }

      // Filter by ratings
      if (activeRatings.length > 0) {
        const bookRating = Math.round(book.rating || 0);
        if (!activeRatings.includes(bookRating)) return false;
      }

      return true;
    });
  }, [books, searchInput, activeCategories, activeRatings]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const toolbarResultText = useMemo(() => {
    const keywordSuffix = searchInput.trim()
      ? ` for "${searchInput.trim()}"`
      : "";
    return `Showing ${filteredBooks.length} results${keywordSuffix}`;
  }, [searchInput, filteredBooks.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div className="books-page-wrap">
      <Header />

      <section className="books-hero">
        <h1>Explore Our Collection</h1>
        <p>Find your next favorite book</p>
      </section>

      <main className="books-content-container">
        {/* Error Alert */}
        {error && (
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: "20px" }}
          />
        )}

        {/* Loading State */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Spin size="large" description="Đang tải danh sách sách..." />
          </div>
        ) : filteredBooks.length === 0 ? (
          // Empty State
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không tìm thấy sách nào phù hợp"
            />
          </div>
        ) : (
          <>
            <div className="books-toolbar">
              <span>{toolbarResultText}</span>

              <Select
                value={sortBy}
                onChange={(value) => {
                  setSortBy(value);
                }}
                options={sortOptions}
                className="books-sort-select"
              />

              <div className="books-toolbar-icons" aria-hidden>
                <Button
                  type={viewMode === "grid" ? "primary" : "default"}
                  icon={<AppstoreOutlined />}
                  onClick={() => handleViewChange("grid")}
                  style={{
                    fontWeight: viewMode === "grid" ? "bold" : "normal",
                    borderColor: viewMode === "grid" ? "#ff4d4f" : "#d9d9d9",
                    backgroundColor:
                      viewMode === "grid" ? "#fff1f0" : "#ffffff",
                  }}
                />
                <Button
                  type={viewMode === "list" ? "primary" : "default"}
                  icon={<BarsOutlined />}
                  onClick={() => handleViewChange("list")}
                  style={{
                    fontWeight: viewMode === "list" ? "bold" : "normal",
                    borderColor: viewMode === "list" ? "#ff4d4f" : "#d9d9d9",
                    backgroundColor:
                      viewMode === "list" ? "#fff1f0" : "#ffffff",
                  }}
                />
              </div>
            </div>

            <Row gutter={[20, 20]}>
              <Col xs={24} lg={7} xl={6}>
                <aside className="books-sidebar">
                  <div className="books-filter-block">
                    <h3>Search</h3>
                    <Input
                      allowClear
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder="Search for books..."
                      suffix={<SearchOutlined />}
                    />
                  </div>

                  <div className="books-filter-block">
                    <h3>Categories</h3>
                    <div className="books-category-list">
                      {categories.map((category) => {
                        const isActive = activeCategories.includes(category);
                        return (
                          <Button
                            key={category}
                            type={isActive ? "primary" : "default"}
                            onClick={() => {
                              setActiveCategories((prev) => {
                                if (prev.includes(category)) {
                                  return [];
                                }
                                return [category];
                              });
                            }}
                          >
                            {category}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="books-filter-block">
                    <h3>By Review</h3>
                    <Space
                      orientation="vertical"
                      size={8}
                      className="books-review-list"
                    >
                      {reviewBuckets.map((bucket) => (
                        <label key={bucket.value} className="books-review-row">
                          <Checkbox
                            checked={activeRatings.includes(bucket.value)}
                            onChange={(event) => {
                              setActiveRatings((prev) => {
                                if (event.target.checked) {
                                  return [...prev, bucket.value];
                                }
                                return prev.filter(
                                  (value) => value !== bucket.value,
                                );
                              });
                            }}
                          />
                          {renderRatingStars(bucket.value)}
                          <span className="books-review-count">
                            {bucket.count}
                          </span>
                        </label>
                      ))}
                    </Space>
                  </div>
                </aside>
              </Col>
              <Col xs={24} lg={17} xl={18}>
                <div className="books-list-wrap">
                  {viewMode === "grid" ? (
                    <GridView books={currentBooks} favoriteIds={favoriteIds} />
                  ) : (
                    <ListView books={currentBooks} favoriteIds={favoriteIds} />
                  )}

                  <div
                    className="books-pagination-wrapper"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      className="books-pagination"
                      style={{
                        padding: "15px 30px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <Pagination
                        current={currentPage}
                        total={filteredBooks.length}
                        pageSize={booksPerPage}
                        onChange={handlePageChange}
                        itemRender={itemRender}
                        showSizeChanger={false}
                        showQuickJumper
                      />
                    </div>
                  </div>
                </div>
              </Col>{" "}
            </Row>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
