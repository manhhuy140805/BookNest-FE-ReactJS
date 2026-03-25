import { Tooltip } from "antd";
import {
  HeartFilled,
  ShareAltOutlined,
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";
import styles from "./BookCard.module.css";

export default function BookCard({ book, onRemoveFavorite }) {
  const handleRemove = () => {
    if (
      window.confirm("Bạn có chắc muốn xóa sách này khỏi danh sách yêu thích?")
    ) {
      if (book?.id) onRemoveFavorite(book.id);
    }
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", book?.id);
  };

  const discountPercent =
    book?.originalPrice && book?.price
      ? Math.round(
          ((book.originalPrice - book.price) / book.originalPrice) * 100,
        )
      : book?.discountPercent || 30;

  const isHot = book?.isHot !== undefined ? book.isHot : true;
  const rating = book?.rating || 3.4;
  const reviewCount = book?.reviewCount || 25;
  const currentPrice = book?.price || 30.0;

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

        {/* Hover Actions - Right side */}
        <div className={styles.hoverActions}>
          <Tooltip title="Xóa khỏi yêu thích" placement="left">
            <button className={styles.actionBtn} onClick={handleRemove}>
              <HeartFilled className={styles.heartIcon} />
            </button>
          </Tooltip>
          <Tooltip title="Chia sẻ" placement="left">
            <button className={styles.actionBtn}>
              <ShareAltOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Xem chi tiết" placement="left">
            <button className={styles.actionBtn}>
              <EyeOutlined />
            </button>
          </Tooltip>
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
          {book?.title || "Simple Things You Save BOOK"}
        </h3>

        <div className={styles.infoRow}>
          <span className={styles.price}>
            {book?.price !== undefined
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(currentPrice)
              : `$${currentPrice.toFixed(2)}`}
          </span>
          <div className={styles.rating}>
            <StarFilled className={styles.starIcon} />
            <span className={styles.ratingText}>
              {rating} ({reviewCount})
            </span>
          </div>
        </div>

        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
