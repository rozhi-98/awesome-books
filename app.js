const booksContainer = document.querySelector('.book-list');
const form = document.querySelector('.form');

let booksArray = [];

if (localStorage.getItem('books')) {
  booksArray = JSON.parse(localStorage.getItem('books'));
}

const createBookMarkup = (data) => {
  const markUp = `

        <li class="book-one">
          <h3 class="book-title">${data.title}</h3>
          <p class="book-author">${data.author}</p>
          <button class="remove-button" type="button" data-id="${data.id}">Remove</button>
          <hr />
        </li>
     
  `;

  return markUp;
};

const injectMarkup = (passedArr) => {
  let books = '';

  passedArr.forEach((obj) => {
    books += createBookMarkup(obj);
  });

  booksContainer.innerHTML = books;
};

injectMarkup(booksArray);

function appendBook(data) {
  const bookMarkup = `<li class="book-one">
  <h3 class="book-title">${data.title}</h3>
  <p class="book-author">${data.author}</p>
  <button class="remove-button" type="button" data-id="${data.id}" >Remove</button>
  <hr />
</li>`;

  booksContainer.insertAdjacentHTML('beforeend', bookMarkup);
}

function getDataAppend() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const author = e.target.author.value;

    if (!title || !author) return;

    const id = `${new Date().getTime().toString()}${Math.trunc(Math.random() * 100)}`;

    const bookData = {
      id,
      title,
      author,
    };

    // Append book
    appendBook(bookData);

    // Adding to existing array
    booksArray.push(bookData);

    localStorage.setItem('books', JSON.stringify(booksArray));
  });
}

getDataAppend();

function removeBook() {
  booksContainer.addEventListener('click', (e) => {
    const clickedBtn = e.target.closest('.remove-button');

    if (!clickedBtn) return;

    console.log(clickedBtn);
    const { id } = clickedBtn.dataset;

    // Filter out clicked book
    booksArray = booksArray.filter((book) => book.id !== id);

    // Override the existing list with new list to update UI
    injectMarkup(booksArray);

    // Update local storage
    localStorage.setItem('books', JSON.stringify(booksArray));
  });
}

removeBook();
