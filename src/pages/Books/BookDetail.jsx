import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckOutlined,
  HeartFilled,
  MinusOutlined,
  PlusOutlined,
  StarFilled,
} from "@ant-design/icons";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer/Footer";
import { getBookById } from "../../services/book";
import "./BookDetail.css";

const FALLBACK_IMAGE = "https://via.placeholder.com/400x560?text=Book";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        const payload = response?.data?.data || response?.data || null;
        console.log("Fetched book details:", payload);
        setBook(payload);
      } catch (err) {
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="book-detail-page">
        <Header />
        <div className="book-detail-state">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="book-detail-page">
        <Header />
        <div className="book-detail-state">{error || "Book not found."}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      <Header />

      <section className="book-detail-hero">
        <h1>Book Details</h1>
        <p>Home / Book Details</p>
      </section>

      <main className="book-detail-container">
        <section className="book-detail-main">
          <div className="book-detail-gallery">
            <div className="book-detail-main-image">
              <img
                src={book.coverUrl || FALLBACK_IMAGE}
                alt={book.title || "Book Cover"}
              />
            </div>
          </div>

          <div className="book-detail-info">
            <div className="book-detail-title-row">
              <h2>{book?.title || "Unknown Title"}</h2>
              <span>Category: {book.category?.name || "Unknown"}</span>
            </div>

            <div className="book-detail-rating-row">
              <div className="book-detail-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarFilled
                    key={`star-${index}`}
                    className={index < book.rating ? "active" : ""}
                  />
                ))}
              </div>
              <small>({book.reviewCount || 0} customer reviews)</small>
            </div>

            <p className="book-detail-description">{book.description}</p>

            <div className="book-detail-action-row">
              <div className="book-detail-qty">
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                >
                  <MinusOutlined />
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((prev) => prev + 1)}
                >
                  <PlusOutlined />
                </button>
              </div>

              <button type="button" className="book-detail-add-btn">
                Add To Cart
              </button>
              <button
                type="button"
                className="book-detail-icon-btn"
                aria-label="Favorite"
              >
                <HeartFilled />
              </button>
            </div>

            <div className="book-detail-meta">
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Category:</strong> {book.category?.name || "Unknown"}
              </p>
              <p>
                <strong>Published:</strong>{" "}
                {new Date(book.createdAt).getFullYear()}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetail;
