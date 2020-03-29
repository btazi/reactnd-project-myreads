# MyReads

Project N°1 of the Udacity's React Nanodegree: Web application that allows users to search for books and add them to their collection.

## Features

- Users have 3 different shelves: Currently Reading, Want To Read, Read
- Users can search for new books in the /search page
- Users can move books to a different shelf or remove them from their collection (in home page and search page)

## Installation

1. `npm install` or `yarn install`
2. `npm start` or `yarn start`

## Note

A starter template was provided to bootstrap the project with:

- HTML & CSS files
- Images
- A backend API (see: ['BooksAPI.js'](src/BooksAPI.js))

## Search Terms

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [`SEARCH_TERMS.md`](SEARCH_TERMS.md). That list of terms are the only terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.
