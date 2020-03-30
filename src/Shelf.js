import React from "react";
import "./App.css";
import Book from "./Book";
import PropTypes from "prop-types";

const Shelf = ({ books, onBookUpdate, shelfTitle }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {" "}
          {books.map(book => (
            <Book key={book.id} book={book} onBookUpdate={onBookUpdate} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired,
  shelfTitle: PropTypes.string.isRequired
};

export default Shelf;
