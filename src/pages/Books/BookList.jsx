import { useMemo, useState, useEffect } from "react";
import { Checkbox, Col, Input, Row, Select, Space } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";
import Header from "../../components/layout/Header";
import "./BookList.css";
import BookCard from "../../components/common/bookCard/BookCard";
import apiClient from "../../config/api";
import Footer from "../../components/common/Footer/Footer";
import { Pagination } from "antd";

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

  const toolbarResultText = useMemo(() => {
    const keywordSuffix = searchInput.trim()
      ? ` for \"${searchInput.trim()}\"`
      : "";
    return `Book list hidden${keywordSuffix}`;
  }, [searchInput]);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.get("/book"); // Corrected endpoint
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
        <h1>Book Default</h1>
        <p>Home &gt; Book Default</p>
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
            <button type="button" className="active">
              <AppstoreOutlined />
            </button>
            <button type="button">
              <BarsOutlined />
            </button>
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
                  placeholder="Search here"
                  suffix={<SearchOutlined />}
                />
              </div>

              <div className="books-filter-block">
                <h3>Categories</h3>
                <div className="books-category-list">
                  {categoryOptions.map((category) => {
                    const isActive = activeCategories.includes(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        className={`books-category-item ${isActive ? "active" : ""}`}
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
                      </button>
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
              <Row gutter={[16, 16]}>
                {currentBooks.map((book) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
                    <BookCard
                      book={book}
                      onRemoveFavorite={handleRemoveFavorite}
                    />
                  </Col>
                ))}
              </Row>
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  pageSize={booksPerPage}
                  total={books.length}
                  onChange={handlePageChange}
                  className="books-pagination"
                  itemRender={itemRender}
                />
              </div>
            </div>
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  );
}
