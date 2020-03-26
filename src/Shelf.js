import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import Book from "./Book";

const Shelf = props => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <Book book={book} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
