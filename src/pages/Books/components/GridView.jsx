import React from "react";
import BookCard from "../../../components/common/bookCard/BookCard";

const GridView = ({ books }) => {
  return (
    <div className="books-display grid">
      {books.map((book) => (
        <div key={book.id} className="book-grid-item">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default GridView;
