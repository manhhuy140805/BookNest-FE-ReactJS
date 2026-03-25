import { Card, Button, Space, Tooltip, Rate, Tag } from "antd";
import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./FavoriteCard.module.css";

export default function FavoriteCard({ book, onRemoveFavorite }) {
  const handleRemove = () => {
    if (
      window.confirm("Bạn có chắc muốn xóa sách này khỏi danh sách yêu thích?")
    ) {
      onRemoveFavorite(book.id);
    }
  };

  const handleAddToCart = () => {
    // TODO: Add to cart logic
    console.log("Add to cart:", book.id);
  };

  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        <div className={styles.imageContainer}>
          {book.coverImage && (
            <img
              alt={book.title}
              src={book.coverImage}
              className={styles.image}
            />
          )}
          <div className={styles.overlay}>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
            >
              Thêm Vào Giỏ
            </Button>
          </div>
        </div>
      }
      bodyStyle={{ padding: "12px" }}
      size="small"
    >
      <div className={styles.content}>
        <h3 className={styles.title} title={book.title}>
          {book.title}
        </h3>

        <p className={styles.author}>{book.author}</p>

        {book.rating && (
          <div className={styles.ratingContainer}>
            <Rate disabled defaultValue={book.rating} size="small" allowHalf />
            <span className={styles.ratingText}>({book.reviewCount || 0})</span>
          </div>
        )}

        <div className={styles.priceContainer}>
          {book.price && (
            <span className={styles.price}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(book.price)}
            </span>
          )}
          {book.originalPrice && book.originalPrice > book.price && (
            <span className={styles.originalPrice}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(book.originalPrice)}
            </span>
          )}
        </div>

        {book.category && (
          <Tag color="blue" className={styles.category}>
            {book.category}
          </Tag>
        )}

        <div className={styles.actions}>
          <Tooltip title="Xóa khỏi danh sách yêu thích">
            <Button
              danger
              icon={<HeartFilled />}
              onClick={handleRemove}
              className={styles.removeBtn}
            >
              Xóa
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}
