import React from "react";
import "./App.css";
import Shelf from "./Shelf";
import _ from "lodash";
import PropTypes from "prop-types";

class HomeScreen extends React.Component {
  render() {
    const { books, shelves, onBookUpdate } = this.props;
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
      </div>
    );
  }
}

HomeScreen.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired
};

export default HomeScreen;
