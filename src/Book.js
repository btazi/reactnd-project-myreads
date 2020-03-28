import React from "react";

import "./App.css";
import PropTypes from "prop-types";

class Book extends React.Component {
  state = {
    selectedShelf: ""
  };

  componentDidMount() {
    this.setState(() => ({
      selectedShelf: this.props.book.shelf || "none"
    }));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.book.shelf !== this.state.selectedShelf) {
      this.setState(() => ({
        selectedShelf: this.props.book.shelf
      }));
    }
  };

  handleShelfChange = event => {
    this.props.onBookUpdate(this.props.book, event.target.value);
  };

  render() {
    const { book } = this.props;
    const { selectedShelf } = this.state;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks &&
                  book.imageLinks.smallThumbnail}")`
              }}
            />
            <div className="book-shelf-changer">
              <select onChange={this.handleShelfChange} value={selectedShelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.join(", ")}
          </div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookUpdate: PropTypes.fund.isRequired
};

export default Book;
