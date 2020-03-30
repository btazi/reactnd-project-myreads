import React, { useState, useEffect } from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import SearchScreen from "./SearchScreen";
import HomeScreen from "./HomeScreen";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const BooksApp = props => {
  const [books, updateBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then(books => {
      updateBooks(books);
    }, []);
  });

  const handleBookUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      // after updating the book on the server add changes locally without reusing the api (getAll())
      let allBooks = [];
      if (book.shelf === "none") {
        // if book isn't in collection add it
        const newBook = { ...book, shelf };
        allBooks = [...books, newBook];
      } else {
        // if book is in collection update shelf only
        allBooks = books.map(b => {
          if (b.id === book.id) {
            return { ...b, shelf };
          } else {
            return b;
          }
        });
      }
      updateBooks(allBooks);
    });
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/search">
            <SearchScreen books={books} onBookUpdate={handleBookUpdate} />
          </Route>
          <Route exact path="/">
            <HomeScreen books={books} onBookUpdate={handleBookUpdate} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default BooksApp;
