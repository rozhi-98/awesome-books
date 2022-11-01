const booksContainer = document.querySelector('.book-list');

const booksArray = [
  {
    title: 'In search of lost times',
    author: 'Marcel Proust',
  },
  {
    title: 'Ulysses',
    author: 'James Joyce',
  },
];

const createMarkup = (data) => {
  const markUp = `
      <div class="book-list">
        <div class="book-one">
          <h3 class="book-title">${data.title}</h3>
          <p class="book-author">${data.author}</p>
          <button id="removeButton" type="button">Remove</button>
          <hr />
        </div>
      </div>
  `;
  return markUp;
};

const injectMarkup = () => {
  let books = '';

  booksArray.forEach((obj) => {
    books += createMarkup(obj);
  });
  booksContainer?.insertAdjacentHTML('afterbegin', books);
};

injectMarkup();
