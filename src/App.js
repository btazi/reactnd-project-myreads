import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import SearchScreen from "./SearchScreen";
import HomeScreen from "./HomeScreen";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState(state => ({
        ...state,
        books
      }));
    });
  }

  handleBookUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      // after updating the book on the server add changes locally without reusing the api (getAll())
      this.setState(state => {
        let books = [];
        if (book.shelf === "none") {
          // if book isn't in collection add it
          const newBook = { ...book, shelf };
          books = [...state.books, newBook];
        } else {
          // if book is in collection update shelf only
          books = state.books.map(b => {
            if (b.id === book.id) {
              return { ...b, shelf };
            } else {
              return b;
            }
          });
        }
        return {
          ...state,
          books
        };
      }, this.updateShelves);
    });
  };

  render() {
    const { books, shelves } = this.state;
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path="/search">
              <SearchScreen
                books={books}
                onBookUpdate={this.handleBookUpdate}
              />
            </Route>
            <Route exact path="/">
              <HomeScreen
                books={books}
                shelves={shelves}
                onBookUpdate={this.handleBookUpdate}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
