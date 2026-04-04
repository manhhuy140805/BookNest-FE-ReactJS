import React from "react";
import "./GridView.css";
import BookCard from "../../../components/common/bookCard/BookCard";

const GridView = ({ books, favoriteIds = [] }) => {
  return (
    <div className="books-display grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} favoriteIds={favoriteIds} />
      ))}
    </div>
  );
};

export default GridView;
