import React from "react";
import "./App.css";
import PropTypes from "prop-types";

const Book = ({ book, onBookUpdate }) => {
  const handleShelfChange = event => {
    onBookUpdate(book, event.target.value);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks &&
                book.imageLinks.smallThumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={handleShelfChange} value={book.shelf || "none"}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookUpdate: PropTypes.func.isRequired
};

export default Book;
