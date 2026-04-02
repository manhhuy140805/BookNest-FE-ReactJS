import { Tooltip } from "antd";
import { StarFilled, HeartOutlined, ArrowsAltOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "./BookCard.module.css";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book, onRemoveFavorite }) {
  const navigate = useNavigate();

  const handleRemove = () => {
    if (
      window.confirm("Bạn có chắc muốn xóa sách này khỏi danh sách yêu thích?")
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
          <Tooltip title="Add to Wishlist" placement="left">
            <button className={styles.actionBtn}>
              <HeartOutlined />
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
            <span className={styles.author}>
              {book?.author || "Tác giả"}
            </span>
          </div>
          <div className={styles.rating}>
            <StarFilled className={styles.starIcon} />
            <span className={styles.ratingText}>
              {rating} ({reviewCount})
            </span>
          </div>
        </div>

        <button className={styles.addDetailBtn} onClick={handleViewDetails}>
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
}
