import React from "react";
import "./App.css";
import Shelf from "./Shelf";
import _ from "lodash";
import PropTypes from "prop-types";
import NavButton from "./NavButton";

const HomeScreen = props => {
  const { books, shelves, onBookUpdate } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map(shelf => (
          <Shelf
            books={books.filter(book => book.shelf === shelf)}
            shelfTitle={_.startCase(shelf)}
            onBookUpdate={onBookUpdate}
            key={shelf}
          />
        ))}
      </div>
      <NavButton path="/search" text="Add new books to collection" />
    </div>
  );
};

HomeScreen.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired
};

export default HomeScreen;
