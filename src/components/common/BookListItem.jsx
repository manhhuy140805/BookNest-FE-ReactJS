import React from "react";
import { useNavigate } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import styles from "./BookListItem.module.css";

const BookListItem = ({ book }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  const coverUrl = book?.coverUrl || "https://via.placeholder.com/120";
  const rating = book?.rating || 0;
  const reviewCount = book?.reviewCount || 0;
  const price = book?.price || "N/A";

  return (
    <div className={styles.listItem}>
      <div className={styles.imageContainer}>
        <img
          src={coverUrl}
          alt={book.title || "Book Cover"}
          className={styles.image}
          onError={(e) => (e.target.src = "https://via.placeholder.com/120")}
        />
      </div>
      <div className={styles.detailsContainer}>
        <h3 className={styles.title}>{book.title || "Book Title"}</h3>
        <p className={styles.description}>
          {book.description || "No description available."}
        </p>
        <div className={styles.metaInfo}>
          <span className={styles.price}>${price}</span>
          <span className={styles.rating}>
            <StarFilled className={styles.starIcon} /> {rating} ({reviewCount})
          </span>
        </div>
        <button
          className={styles.detailsButton}
          onClick={() => handleViewDetails(book.id)}
        >
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
