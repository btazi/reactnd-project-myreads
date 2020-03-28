import React from "react";
import "./App.css";
import Book from "./Book";
import PropTypes from "prop-types";

const Shelf = props => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {" "}
          {props.books.map(book => (
            <Book key={book.id} book={book} onBookUpdate={props.onBookUpdate} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired
};

export default Shelf;
