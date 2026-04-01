import React from "react";
import { useNavigate } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import "./GridView.css";

const GridView = ({ books }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="books-display grid">
      {books.map((book) => {
        const rating = book?.rating || 0;
        const reviewCount = book?.reviewCount || 0;
        const coverUrl =
          book?.coverUrl || "https://via.placeholder.com/150x200?text=Book";

        return (
          <div key={book.id} className="grid-book-item">
            <div className="grid-book-image">
              <img
                src={coverUrl}
                alt={book?.title || "Book Cover"}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150x200?text=Book")
                }
              />
            </div>
            <h4 className="grid-book-title">
              {book?.title || "Unknown Title"}
            </h4>
            <div className="grid-book-divider"></div>
            <div className="grid-book-rating">
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
            <button
              className="grid-book-button"
              onClick={() => handleViewDetails(book.id)}
            >
              Xem Chi Tiết
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GridView;
