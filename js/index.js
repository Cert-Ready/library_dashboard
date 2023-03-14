const bookGrid = document.querySelector('.books');
let myLibrary = [];
const addSample = document.querySelector('.add-sample');
const formContainer = document.querySelector('.formV01-container');
const formEl = document.querySelector('#formV01');

// event listeners
formEl.addEventListener('submit', (e) => (e.preventDefault(), addBookToLibrary()));
addSample.onclick = () => addSampleBook();

// object constructor function for Book
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype = {
  protoToggleStatus() {
    this.status = !this.status;
  },
};

// add book with modal
function addBookToLibrary() {
  const bookTitle = document.querySelector('#book-title').value.trim();
  const bookAuthor = document.querySelector('#book-author').value.trim();
  const bookPages = document.querySelector('#book-pages').value.trim();
  const bookStatus = document.querySelector('#book-status').value.trim();
  let evalStatus = bookStatus === 'true';
  // validate modal
  if (bookTitle === '' || bookAuthor === '' || bookPages === '' || bookStatus === '') {
    return;
  } else {
    // add book if modal is valid
    let newBook = new Book(bookTitle, bookAuthor, bookPages, evalStatus);
    myLibrary.push(newBook); // push book to myLibrary[]
    renderLibrary(); // render library
    toggleForm(); // close modal
    formEl.reset(); // clear modal
    clearError(); // reset modal validation
  }
}

// render all books
function renderBooks() {
  let bookLib = '';
  myLibrary.forEach((item, index) => (bookLib = createMarkup(bookLib, item, index)));
  bookGrid.innerHTML = bookLib;
}

// helper function to crete markup
const createMarkup = (bookLib, book) => {
  bookLib += `
    <div class="book-card">
      <h2>${book.title}</h2>
      <hr />
      <h3>
        Author: <span class="book-author">${book.author}</span>
      </h3>
      <h3>
        Pages: <span class="book-pages">${book.pages}</span>
      </h3>
      <h3>
        Status: 
        <span class="book-status">
        ${
          book.status
            ? '<i class="fa-solid fa-circle-check"></i> Complete'
            : '<i class="fa-solid fa-clock"></i> In Progress'
        }
        </span>
      </h3>
      <div class="flex-space-between">
      <div class="change-status book-action">
        <i class="fa-solid fa-pen-to-square"></i>
        <span>Edit Status</span>
      </div>
      <div class="delete-book book-action">
        <i class="fa-solid fa-trash"></i>
        <span>Delete</span>
      </div>
      </div>
    </div>
    `;
  return bookLib;
};

// render library
function renderLibrary() {
  if (myLibrary.length === 0) {
    renderPlaceholder();
  } else {
    renderBooks();
  }
  updateLibLog();
  handleBookActions();
}

// helper function to render place holder
function renderPlaceholder() {
  return (bookGrid.innerHTML = `
      <div class="no-books">
        <h2>Adventure Awaits</h2>
        <hr />
        <img src="./img/undraw_book_lover_re_rwjy.svg" alt="book lover" class="hero-img" />
      </div>
    `);
}

// delete book and edit book status on click
function handleBookActions() {
  const toggleEl = document.querySelectorAll('.change-status');
  const deleteEl = document.querySelectorAll('.delete-book');
  deleteEl.forEach((el, index) => (el.onclick = () => deleteBook(index)));
  toggleEl.forEach((el, index) => (el.onclick = () => toggleStatus(index)));
}

// helper function to handle book deletion
const deleteBook = (index) => {
  myLibrary.splice(index, 1);
  renderLibrary();
};

// helper function to handle book status toggle
const toggleStatus = (index) => {
  myLibrary[index].protoToggleStatus();
  renderLibrary();
};

// helper function to add a sample book to library
function addSampleBook() {
  myLibrary.push(new Book('Don Quixote', 'Miguel De Cervantes', 1072, randomBol()));
  renderLibrary();
  updateLibLog();
}

// QOL for addSampleBook returns a random boolean
function randomBol() {
  let randomBol = Math.floor(Math.random() * 2);
  randomBol === 0 ? (randomBol = false) : (randomBol = true);
  return randomBol;
}

// helper function to open the modal
function toggleForm() {
  formContainer.classList.toggle('form-toggle');
}

// helper function to clear modal errors on submit
function clearError() {
  const errorEl = document.querySelectorAll('.error-msj');
  errorEl.forEach(
    (el) => (
      setTimeout(() => (el.textContent = ''), 250),
      setTimeout(() => (el.style.backgroundColor = 'transparent'), 250)
    )
  );
}

// helper function to update library log
function updateLibLog() {
  const totalEl = document.querySelector('.total-books');
  const readEl = document.querySelector('.read-books');
  const unreadEl = document.querySelector('.unread-books');
  totalEl.textContent = myLibrary.length;
  readEl.textContent = myLibrary.filter((el) => el.status === true).length;
  unreadEl.textContent = myLibrary.filter((el) => el.status === false).length;
}

// The DOMContentLoaded event fires when the HTML document has been completely parsed
// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
https: window.addEventListener('DOMContentLoaded', renderLibrary);
