import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Tooltip, message } from "antd";
import {
  CheckOutlined,
  HeartFilled,
  HeartOutlined,
  StarFilled,
} from "@ant-design/icons";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer/Footer";
import { getBookById } from "../../services/book";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../../services/favorites";
import "./BookDetail.css";

const FALLBACK_IMAGE = "https://via.placeholder.com/400x560?text=Book";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        const payload = response?.data?.data || response?.data || null;
        setBook(payload);
      } catch (err) {
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Check if book is already in favorites on mount
  useEffect(() => {
    if (!book?.id) return;

    const checkIfFavorite = async () => {
      try {
        const response = await getFavorites();
        if (
          response?.data?.favoriteBooks &&
          Array.isArray(response.data.favoriteBooks)
        ) {
          const favoriteIds = response.data.favoriteBooks.map((fav) => fav.id);
          if (favoriteIds.includes(book.id)) {
            setIsFavorited(true);
          }
        }
      } catch (error) {
        // Silent fail - don't show error to user
      }
    };

    checkIfFavorite();
  }, [book?.id]);

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await removeFavorite(book.id);
        setIsFavorited(false);
        message.success("Đã xóa khỏi danh sách yêu thích!");
      } else {
        await addFavorite(book.id);
        setIsFavorited(true);
        message.success("Đã thêm vào danh sách yêu thích!");
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      message.error("Có lỗi xảy ra!");
    }
  };

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
              <button type="button" className="book-detail-add-btn">
                Đọc sách
              </button>
              <Tooltip
                title={isFavorited ? "Remove from Wishlist" : "Add to Wishlist"}
                placement="top"
              >
                <button
                  type="button"
                  className="book-detail-icon-btn"
                  aria-label="Favorite"
                  onClick={toggleFavorite}
                  style={{
                    color: isFavorited ? "#ff4d4f" : "#d9d9d9",
                  }}
                >
                  {isFavorited ? <HeartFilled /> : <HeartOutlined />}
                </button>
              </Tooltip>
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
