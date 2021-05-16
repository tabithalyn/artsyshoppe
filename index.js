const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
}
showMenu('nav-toggle','nav-menu');

var navLink = document.querySelectorAll('.nav_link');
function linkAction() {
  // Active link
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  // Remove menu mobile
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show');
}
const navMenu = document.getElementById('nav-menu');
navLink.forEach(n => n.addEventListener('click', linkAction));
navMenu.classList.remove('show');

// Shopping Cart:
let carts = document.querySelectorAll('.add_cart');
for (let i=0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers();
  });
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart-num').textContent = productNumbers;
  }
}
function cartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart-num').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart-num').textContent = 1;
  }
}
onLoadCartNumbers();
