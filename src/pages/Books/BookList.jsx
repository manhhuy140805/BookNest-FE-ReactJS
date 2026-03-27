import { useMemo, useState, useEffect } from "react";
import { Checkbox, Col, Input, Row, Select, Space, Button } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";
import Header from "../../components/layout/Header";
import "./BookList.css";
import apiClient from "../../config/api";
import Footer from "../../components/common/Footer/Footer";
import { Pagination } from "antd";
import GridView from "./components/GridView";
import ListView from "./components/ListView";

const reviewBuckets = [
  { value: 5, count: 35 },
  { value: 4, count: 24 },
  { value: 3, count: 15 },
  { value: 2, count: 2 },
  { value: 1, count: 1 },
];

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
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeRatings, setActiveRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const [viewMode, setViewMode] = useState("grid");

  const toolbarResultText = useMemo(() => {
    const keywordSuffix = searchInput.trim()
      ? ` for "${searchInput.trim()}"`
      : "";
    return `Book list hidden${keywordSuffix}`;
  }, [searchInput]);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.get("/book");
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleRemoveFavorite = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

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
                  {categoryOptions.map((category) => {
                    const isActive = activeCategories.includes(category);
                    return (
                      <Button
                        key={category}
                        type={isActive ? "primary" : "default"}
                        onClick={() => {
                          setActiveCategories((prev) => {
                            if (prev.includes(category)) {
                              return prev.filter((value) => value !== category);
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

              <div className="books-filter-block">
                <h3>Product Status</h3>
                <Select
                  value={activeStatus}
                  className="books-status-select"
                  onChange={(value) => {
                    setActiveStatus(value);
                  }}
                  options={[
                    { label: "All", value: "all" },
                    { label: "In Stock", value: "in-stock" },
                    { label: "On Sale", value: "on-sale" },
                  ]}
                />
              </div>

              <div className="books-filter-block">
                <h3>By Review</h3>
                <Space
                  direction="vertical"
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
                      <span className="books-review-count">{bucket.count}</span>
                    </label>
                  ))}
                </Space>
              </div>
            </aside>
          </Col>

          <Col xs={24} lg={17} xl={18}>
            <div className="books-list-wrap">
              {viewMode === "grid" ? (
                <GridView books={currentBooks} />
              ) : (
                <ListView books={currentBooks} />
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
                    total={books.length}
                    pageSize={booksPerPage}
                    onChange={handlePageChange}
                    itemRender={itemRender}
                    showSizeChanger={false}
                    showQuickJumper
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  );
}
