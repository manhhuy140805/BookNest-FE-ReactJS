import { StarFilled } from "@ant-design/icons";
import { Card, Tag } from "antd";
import "./BookGridItem.css";

const fallbackCover =
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80";

export default function BookGridItem({ book }) {
  const title = book?.title || book?.name || "Updating title";
  const image =
    book?.coverImage || book?.thumbnail || book?.image || fallbackCover;
  const rating = Number(book?.averageRating || book?.rating || 0);
  const reviewCount = Number(book?.reviewCount || 0);
  const author = book?.author || book?.authorName || "Unknown author";

  return (
    <Card
      hoverable
      className="book-item-card"
      styles={{ body: { padding: 0 } }}
    >
      <div className="book-item-cover-wrap">
        <img
          className="book-item-image"
          src={image}
          alt={title}
          onError={(event) => {
            event.currentTarget.src = fallbackCover;
          }}
        />
        <div className="book-item-badges">
          {book?.hotLabel ? (
            <Tag className="book-item-badge-hot">{book.hotLabel}</Tag>
          ) : null}
          {book?.discountLabel ? (
            <Tag className="book-item-badge-sale">{book.discountLabel}</Tag>
          ) : null}
        </div>
      </div>

      <h3 className="book-item-title">{title}</h3>

      <div className="book-item-meta">
        <span className="book-item-author">By {author}</span>
        <span className="book-item-rating">
          <StarFilled /> {rating.toFixed(1)} ({reviewCount})
        </span>
      </div>
    </Card>
  );
}
