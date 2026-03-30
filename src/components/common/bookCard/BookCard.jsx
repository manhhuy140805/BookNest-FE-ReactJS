import { Tooltip } from "antd";
import {
  HeartFilled,
  ShareAltOutlined,
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";
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
  const currentPrice = book?.price || 0;
  const originalPrice = book?.originalPrice || null;

  const coverUrl =
    book?.coverImage || book?.imageUrl || "/images/sample-book.jpg";

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
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title} title={book?.title}>
          {book?.title || "Book Title"}
        </h3>

        <div className={styles.rating}>
          <StarFilled className={styles.starIcon} />
          <span className={styles.ratingText}>
            {rating} ({reviewCount})
          </span>
        </div>

        <button className={styles.addToCartBtn} onClick={handleViewDetails}>
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
}
