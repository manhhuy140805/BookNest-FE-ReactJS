import { Tooltip, message } from "antd";
import {
  StarFilled,
  HeartOutlined,
  HeartFilled,
  ArrowsAltOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import styles from "./BookCard.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "../../../services/favorites";

export default function BookCard({ book, onRemoveFavorite, favoriteIds = [] }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if book is in favorites based on favoriteIds prop
  useEffect(() => {
    if (book?.id && favoriteIds.includes(book.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [book?.id, favoriteIds]);

  const handleAddToWishlist = async () => {
    if (!book?.id) return;

    try {
      setLoading(true);

      if (isFavorite) {
        // Remove from favorites
        await removeFavorite(book.id);
        setIsFavorite(false);
        message.success("Removed from wishlist!");
      } else {
        // Add to favorites
        await addFavorite(book.id);
        setIsFavorite(true);
        message.success("Added to wishlist!");
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);
      message.error("Error occurred!");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    if (
      window.confirm(
        "Are you sure you want to remove this book from your wishlist?",
      )
    ) {
      if (book?.id) onRemoveFavorite(book.id);
    }
  };

  const handleViewDetails = () => {
    navigate(`/books/${book?.id}`);
  };

  const discountPercent =
    book?.originalPrice && book?.price
      ? Math.round(
          ((book.originalPrice - book.price) / book.originalPrice) * 100,
        )
      : book?.discountPercent || 0;

  const isHot = book?.isHot !== undefined ? book.isHot : false;
  const rating = book?.rating || 0;
  const reviewCount = book?.reviewCount || 0;

  const coverUrl =
    book?.coverUrl || book?.imageUrl || "/images/sample-book.jpg";

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Badges */}
        <div className={styles.badges}>
          {isHot && <div className={styles.hotBadge}>Hot</div>}
          {discountPercent > 0 && (
            <div className={styles.discountBadge}>-{discountPercent}%</div>
          )}
        </div>

        {/* Book Cover */}
        <img
          alt={book?.title || "Book Cover"}
          src={coverUrl}
          className={styles.image}
        />

        {/* Hover Actions */}
        <div className={styles.hoverActions}>
          <Tooltip
            title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            placement="left"
          >
            <button
              className={`${styles.actionBtn} ${isFavorite ? styles.activeWishlist : ""}`}
              onClick={handleAddToWishlist}
              disabled={loading}
            >
              {isFavorite ? <HeartFilled /> : <HeartOutlined />}
            </button>
          </Tooltip>
          <Tooltip title="Quick View" placement="left">
            <button className={styles.actionBtn}>
              <ArrowsAltOutlined />
            </button>
          </Tooltip>
          <Tooltip title="View Details" placement="left">
            <button className={styles.actionBtn} onClick={handleViewDetails}>
              <EyeOutlined />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title} title={book?.title}>
          {book?.title || "Book Title"}
        </h3>

        <div className={styles.infoRow}>
          <div className={styles.authorContainer}>
            <span className={styles.author}>{book?.author || "Author"}</span>
          </div>
          <div className={styles.rating}>
            <StarFilled className={styles.starIcon} />
            <span className={styles.ratingText}>
              {rating} ({reviewCount})
            </span>
          </div>
        </div>

        <button className={styles.addDetailBtn} onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
}
