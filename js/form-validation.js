(() => {
  const formEl = document.querySelector('#formV01');
  const bookTitle = document.querySelector('#book-title');
  const bookAuthor = document.querySelector('#book-author');
  const bookPages = document.querySelector('#book-pages');
  const bookStatus = document.querySelector('#book-status');

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
  });

  const displayError = (el, msj) => {
    const inputContainer = el.parentElement;
    const errorShow = inputContainer.querySelector('.error-msj');
    errorShow.innerText = msj;
    errorShow.style.backgroundColor = 'var(--light-0)';
  };

  const displaySuccess = (el) => {
    const inputContainer = el.parentElement;
    const errorShow = inputContainer.querySelector('.error-msj');
    errorShow.textContent = '';
    errorShow.style.backgroundColor = 'transparent';
  };

  const validateInputs = () => {
    const bookTitleVal = bookTitle.value.trim();
    const bookAuthorVal = bookAuthor.value.trim();
    const bookPagesVal = bookPages.value.trim();
    const bookStatusVAl = bookStatus.value.trim();

    if (bookTitleVal === '') {
      displayError(bookTitle, 'Book Title is required');
    } else {
      displaySuccess(bookTitle);
    }

    if (bookAuthorVal === '') {
      displayError(bookAuthor, 'Book Author is required');
    } else {
      displaySuccess(bookAuthor);
    }

    if (bookPagesVal === '') {
      displayError(bookPages, 'Please enter number of pages');
    } else {
      displaySuccess(bookPages);
    }

    if (bookStatusVAl === '') {
      displayError(bookStatus, 'Please select one');
    } else {
      displaySuccess(bookStatus);
    }
  };

  bookTitle.addEventListener('input', validateInputs);
  bookAuthor.addEventListener('input', validateInputs);
  bookPages.addEventListener('input', validateInputs);
  bookStatus.addEventListener('input', validateInputs);
})();
