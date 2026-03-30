import React from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../../components/common/bookCard/BookCard";

const ListView = ({ books }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="books-display list">
      {books.map((book) => (
        <div
          key={book.id}
          className="book-list-item"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px",
            marginBottom: "16px",
            border: "1px solid #ebebeb",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="book-image"
            style={{ flexShrink: 0, marginRight: "16px" }}
          >
            <img
              src={book.image || "https://via.placeholder.com/120"} // Fallback image
              alt={book.title}
              style={{
                width: "120px",
                height: "180px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="book-details" style={{ flex: 1 }}>
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {book.title}
            </h3>
            <p
              style={{
                margin: "8px 0",
                color: "#555",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {book.description}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  color: "#f76f5f",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                ${book.price}
              </span>
              <span style={{ color: "#999", fontSize: "14px" }}>
                Rating: {book.rating || "N/A"} ★
              </span>
              <button
                style={{
                  backgroundColor: "#ffe3df",
                  color: "#f76f5f",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f76f5f";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#ffe3df";
                  e.target.style.color = "#f76f5f";
                }}
                onClick={() => handleViewDetails(book.id)}
              >
                Xem Chi Tiết
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
