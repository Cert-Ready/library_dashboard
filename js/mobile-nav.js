(() => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.navigation');
  let toggle = false;

  hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('nav-toggle');
    hamburgerMenu.classList.toggle('iconV02');
    toggleIcon();
  });

  function toggleIcon() {
    if (toggle) {
      hamburgerMenu.src = './img/mobile-nav/menu.svg';
    } else {
      hamburgerMenu.src = './img/mobile-nav/close.svg';
    }
    toggle = !toggle;
  }
})();
