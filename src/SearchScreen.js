import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";
import _ from "lodash";
import "./App.css";
import { withRouter } from "react-router-dom";

const SearchScreen = ({ books, onBookUpdate, history }) => {
  const [foundBooks, updateFoundBooks] = useState([]);
  const [query, updateQuery] = useState("");
  const [prevBooks, updatePrevBooks] = useState([]);

  const handleQueryChange = event => {
    const query = event.target.value;
    updateQuery(query);
  };

  useEffect(
    () => {
      searchBooks();
    },
    [query]
  );

  // this method does 3 things:
  // 1) replaces books in search result with books from props
  // 2) adds {shelf: "none"} to the other books in result
  // 3) updates foundBooks in state
  const mergeBooks = (collectionBooks, searchedBooks) => {
    const collectionBooksIds = collectionBooks.map(b => b.id);
    let foundBooks = [];
    if (searchedBooks.length > 0) {
      foundBooks = searchedBooks.map(book => {
        if (_.includes(collectionBooksIds, book.id)) {
          // 1) replaces books in search result with books from props
          return _.find(books, { id: book.id });
        } else {
          // 2) adds {shelf: "none"} to the other books in result
          return { ...book, shelf: "none" }; // if book is not in collection
        }
      });
    } // 3) updates foundBooks in state
    updateFoundBooks(foundBooks);
  };

  if (books !== prevBooks) {
    mergeBooks(books, foundBooks);
    updatePrevBooks(books);
  }

  const searchBooks = () => {
    BooksAPI.search(query).then(resp => {
      if (typeof resp === "object") {
        // merge books even if the resp is an empty array []
        mergeBooks(books, resp);
      } else {
        // if there is an error (typeof(resp) === "undefined") return an empty array
        updateFoundBooks([]);
      }
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {foundBooks.map(book => (
            <Book key={book.id} book={book} onBookUpdate={onBookUpdate} />
          ))}
        </ol>
      </div>
    </div>
  );
};

SearchScreen.propTypes = {
  books: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired
};

export default withRouter(SearchScreen);
