import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";
import _ from "lodash";
import "./App.css";

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
      this.searchBooks();
    }
  }

  searchBooks = () => {
    const collectionBooksIds = this.props.books.map(b => b.id);
    BooksAPI.search(this.state.query).then(resp => {
      if (typeof resp === "object") {
        const foundBooks = resp.map(book => {
          // add shelf to searched books
          if (_.includes(collectionBooksIds, book.id)) {
            return _.find(this.props.books, { id: book.id }); // if book is in collection return collection book
          } else {
            return { ...book, shelf: "none" }; // if book is not in collection
          }
        });
        this.setState(state => {
          return {
            ...state,
            foundBooks
          };
        });
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
            onClick={() => this.setState({ showSearchPage: false })}
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

export default SearchScreen;
