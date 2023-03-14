(() => {
  const openForm = document.querySelector('.add-book');
  const closeForm = document.querySelector('.fa-circle-xmark');
  const formContainer = document.querySelector('.formV01-container');

  // close open form dependent on element clicked
  openForm.addEventListener('click', toggleForm);
  closeForm.addEventListener('click', toggleForm);

  // listen for clicks outside of the form
  formContainer.addEventListener('click', function (e) {
    if (e.target != formContainer) {
      return;
    } else {
      toggleForm();
    }
  });

  function toggleForm() {
    formContainer.classList.toggle('form-toggle');
  }
})();
