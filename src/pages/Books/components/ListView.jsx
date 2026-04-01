import React from "react";
import { useNavigate } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { Spin, Empty } from "antd";
import "./ListView.css";

const ListView = ({ books, loading = false }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div
        className="books-display list"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Spin size="large" tip="Đang tải danh sách sách..." />
      </div>
    );
  }

  // Empty state
  if (!books || books.length === 0) {
    return (
      <div
        className="books-display list"
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
    );
  }

  return (
    <div className="books-display list">
      {books.map((book) => {
        const rating = book?.rating || 0;
        const reviewCount = book?.reviewCount || 0;
        const coverUrl =
          book?.coverUrl || "https://via.placeholder.com/150x220?text=Book";

        return (
          <div key={book.id} className="list-book-item">
            <div className="list-book-image">
              <img
                src={coverUrl}
                alt={book?.title || "Book Cover"}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150x220?text=Book")
                }
              />
            </div>
            <div className="list-book-info">
              <h2 className="list-book-title">
                {book?.title || "Unknown Title"}
              </h2>
              <div className="list-book-rating">
                <div className="rating-stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarFilled
                      key={index}
                      className={index < rating ? "active" : "inactive"}
                    />
                  ))}
                </div>
                <span className="rating-count">({reviewCount})</span>
              </div>
              <p className="list-book-description">
                {book?.description || "No description available."}
              </p>
            </div>
            <div className="list-book-actions">
              <button
                className="list-book-button"
                onClick={() => handleViewDetails(book.id)}
              >
                Xem Chi Tiết
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
