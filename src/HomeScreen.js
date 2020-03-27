import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";
import _ from "lodash";

class HomeScreen extends React.Component {
  state = {
    books: [],
    shelves: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  updateShelves = () => {
    this.setState(state => ({
      shelves: _.uniq(state.books.map(book => book.shelf))
    }));
  };

  getAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState(
        state => ({
          ...state,
          books
        }),
        this.updateShelves
      );
    });
  }

  handleBookUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      // if there is a response it means that the book has been updated succesfully on the server. It is possible to fetch all books again but that would add an unnecessary request to the server
      this.setState(state => {
        return {
          ...state,
          books: state.books.map(b => {
            if (book === b) {
              // if method book then change shelf
              return { ...book, shelf: shelf };
            } else {
              return b;
            }
          })
        };
      }, this.updateShelves);
    });
  };

  render() {
    const { books, shelves } = this.state;
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
              onBookUpdate={this.handleBookUpdate}
              key={shelf}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default HomeScreen;
