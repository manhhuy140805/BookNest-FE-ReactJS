import React from "react";
import BookListItem from "../../../components/common/BookListItem";

const ListView = ({ books }) => {
  return (
    <div className="books-display list">
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default ListView;
