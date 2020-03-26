import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import Shelf from "./Shelf";
import * as BooksAPI from "./BooksAPI";
import _ from "lodash";

class HomeScreen extends React.Component {
  state = {
    books: [],
    shelves: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books,
        shelves: _.uniq(books.map(book => book.shelf))
      }));
    });
  }

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
            />
          ))}
        </div>
      </div>
    );
  }
}

export default HomeScreen;
