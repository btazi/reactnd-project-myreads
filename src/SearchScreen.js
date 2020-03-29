import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";
import _ from "lodash";
import "./App.css";
import { withRouter } from "react-router-dom";

class SearchScreen extends React.Component {
  state = { foundBooks: [], query: "" };

  handleQueryChange = event => {
    const query = event.target.value;
    this.setState(
      state => {
        return { ...state, query };
      },
      () => this.searchBooks()
    );
  };

  componentDidUpdate(prevProps, prevstate) {
    // this referesh books when a book shelf is updated
    if (prevProps.books !== this.props.books) {
      this.mergeBooks(this.props.books, this.state.foundBooks);
    }
  }

  // this method does 3 things:
  // 1) replaces books in search result with books from props
  // 2) adds {shelf: "none"} to the other books in result
  // 3) updates foundBooks in state
  mergeBooks = (collectionBooks, searchedBooks) => {
    const collectionBooksIds = collectionBooks.map(b => b.id);
    const foundBooks = searchedBooks.map(book => {
      if (_.includes(collectionBooksIds, book.id)) {
        // 1) replaces books in search result with books from props
        return _.find(this.props.books, { id: book.id });
      } else {
        // 2) adds {shelf: "none"} to the other books in result
        return { ...book, shelf: "none" }; // if book is not in collection
      }
    });
    // 3) updates foundBooks in state
    this.setState(state => {
      return {
        ...state,
        foundBooks
      };
    });
  };

  searchBooks = () => {
    BooksAPI.search(this.state.query).then(resp => {
      if (typeof resp === "object") {
        this.mergeBooks(this.props.books, resp);
      }
    });
  };

  render() {
    const { foundBooks, query } = this.state;
    const { onBookUpdate } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.history.push("/")}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleQueryChange}
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
  }
}

SearchScreen.propTypes = {
  books: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired
};

export default withRouter(SearchScreen);
