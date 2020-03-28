import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import SearchScreen from "./SearchScreen";
import _ from "lodash";
import HomeScreen from "./HomeScreen";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
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
            if (book.id === b.id) {
              // if method book then change shelf
              return { ...b, shelf };
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
