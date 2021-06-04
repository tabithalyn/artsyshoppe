if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

// Nav Menu
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

// Products
let products = [
  {
	name: 'Guitar Waves',
	tag: 'guitarwaves',
	price: 25.42,
	inCart: 0
  },
  {
	name: 'Ghost in the Park',
	tag: 'ghost',
	price: 25.42,
	inCart: 0
  },
  {
	name: 'Acid Skeletons',
	tag: 'skeletons',
	price: 25.42,
	inCart: 0
  },
  {
	name: 'Take It Easy',
	tag: 'takeiteasy',
	price: 25.42,
	inCart: 0
  },
  {
	name: 'She',
	tag: 'sheportrait',
	price: 25.42,
	inCart: 0
  },
  {
	name: 'Pillow',
	tag: 'oldefortran',
	price: 23.56,
	inCart: 0
  },
  {
	name: 'Coffee Cup',
	tag: 'mothertattoo',
	price: 13.66,
	inCart: 0
  },
  {
	name: 'Clock',
	tag: 'mtv',
	price: 43.48,
	inCart: 0
  },
  {
	name: 'Tee',
	tag: 'heart',
	price: 23.54,
	inCart: 0
  },
  {
	name: 'Tank',
	tag: 'robots',
	price: 36.36,
	inCart: 0
  },
  {
	name: 'Sweater',
	tag: 'neoninvaders',
	price: 37.70,
	inCart: 0
  }
];

function ready() {
  var removeCartProductBtns = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < removeCartProductBtns.length; i++) {
      var button = removeCartProductBtns[i]
      button.addEventListener('click', removeCartProduct)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantityInput')
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('shop-productBtn');
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i];
      button.addEventListener('click', addToCartClick);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClick)
}

// Purchase Button Click
function purchaseClick() {
  alert('Thank you for your purchase!')
  var cartProducts = document.getElementsByClassName('cart-products')[0]
  while (cartProducts.hasChildNodes()) {
    cartProducts.removeChild(cartProducts.firstChild)
  }
  updateCartTotal()
}

// Remove Product from Cart
function removeCartProduct(event) {
  var buttonClick = event.target
  buttonClick.parentElement.parentElement.remove()
  updateCartTotal()
}

// Quantity Change
function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

// Add To Cart Click
function addToCartClick(event) {
  var button = event.target;
  var shopProduct = button.parentElement.parentElement;
  var title = shopProduct.getElementsByClassName('shop-productTitle')[0].innerText;
  var price = shopProduct.getElementsByClassName('shop-productPrice')[0].innerText;
  var imageSrc = shopProduct.getElementsByClassName('shop-productImg')[0].src;
  addProductToCart(title, price, imageSrc);
  updateCartTotal();
}

// Product Added to Cart
function addProductToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartProducts = document.getElementsByClassName('cart-products')[0]
  var cartProductNames = cartProducts.getElementsByClassName('cart-productTitle')
  for (var i = 0; i < cartProductNames.length; i++) {
      if (cartProductNames[i].innerText == title) {
          alert('This product is already added to the cart')
          return
      }
  }
  var cartRowContents = `
      <div class="cart-product cart-column">
          <img class="cart-productImg" src="${imageSrc}" width="100" height="100">
          <span class="cart-productTitle">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantityInput" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartProducts.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartProduct)
  cartRow.getElementsByClassName('cart-quantityInput')[0].addEventListener('change', changeQuantity)
}

// Cart Total
function updateCartTotal() {
  var cartProductContainer = document.getElementsByClassName('cart-products')[0]
  var cartRows = cartProductContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantityInput')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-totalPrice')[0].innerText = '$' + total;
  updateCartQuantity();
}
