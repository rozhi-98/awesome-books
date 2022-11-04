import UI from './UI.js';
import Store from './Store.js';

// creating a class for the books
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// create event to display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// adding a book

document.querySelector('.book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = `${new Date().getTime().toString()}${Math.trunc(
    // eslint-disable-next-line comma-dangle
    Math.random() * 100
  )}`;

  // createan object of book class

  const book = new Book(title, author, id);

  UI.addBookToList(book);

  // Add book from localstorage

  Store.addBook(book);

  // method to clear the fields after submission

  UI.clearFields();
});

// removing a book

document.querySelector('#book-list').addEventListener('click', (e) => {
  // remove book from UI
  UI.deleteBook(e.target);

  // remove book from storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
