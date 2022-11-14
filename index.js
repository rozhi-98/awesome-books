import UI from './modules/UI.js';
import Store from './modules/Store.js';

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
    Math.random() * 100,
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

// set time
const insertDate = () => {
  const dateEl = document.querySelector('.display-date');
  const date = new Date();
  const displayDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const displayTime = date.toLocaleTimeString();

  const dateString = `${displayDate}, ${displayTime}`;

  dateEl.innerHTML = dateString;
};

setInterval(() => {
  insertDate();
}, 1000);

const links = document.querySelectorAll('.links');

function showBlock(e) {
  const sectionList = document.getElementById('list');
  const sectionAdd = document.getElementById('add_book');
  const sectionContact = document.getElementById('contact');
  switch (e) {
    case 'list-link':
      sectionList.style.display = 'block';
      sectionAdd.style.display = 'none';
      sectionContact.style.display = 'none';
      break;

    case 'add-link':
      sectionAdd.style.display = 'block';
      sectionList.style.display = 'none';
      sectionContact.style.display = 'none';
      break;

    case 'contact-link':
      sectionContact.style.display = 'flex';
      sectionAdd.style.display = 'none';
      sectionList.style.display = 'none';
      break;

    default:
      sectionAdd.style.display = 'block';
      sectionList.style.display = 'none';
      sectionContact.style.display = 'none';
      break;
  }
}

links.forEach((element) => {
  element.addEventListener('click', function () {
    showBlock(element.id);
    const current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += 'active';
  });
});

// show each section dynamically
const showSectionDynamically = () => {
  const navLinks = document.querySelector('.nav-links');
  const allSections = document.querySelectorAll('section');

  navLinks.addEventListener('click', (e) => {
    e.preventDefault();
    const clickedLink = e.target.closest('.nav-link');
    if (!clickedLink) return;

    const id = clickedLink.getAttribute('href').replace('#', '');

    [...allSections].forEach((sec) => {
      sec.classList.add('hide');
    });

    const elementToShow = document.getElementById(id);
    elementToShow.classList.remove('hide');
  });
};

showSectionDynamically();
