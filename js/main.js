document.addEventListener("DOMContentLoaded", function() {
  var addToCartButtons = document.querySelectorAll(".card__link");

  var popup = document.querySelector(".popup");

  addToCartButtons.forEach(function(button) {
      button.addEventListener("click", function(event) {
          event.preventDefault();

          showPopup(popup);

          setTimeout(function() {
              hidePopup(popup);
          }, 1000);
      });
  });

  function showPopup(popup) {
      popup.style.display = "block";
  }

  function hidePopup(popup) {
      popup.style.display = "none";
  }
});

const cart = {};
const prices = {};

function openCart() {
    document.getElementById('myModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('myModal').style.display = 'none';
}

function addToCart(productId, price, event) {
    event.preventDefault();
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }
    prices[productId] = price;
    renderCart();
}

function changeQuantity(productId, operation) {
    if (operation === '+') {
        cart[productId]++;
    } else if (operation === '-' && cart[productId] > 1) {
        cart[productId]--;
    }
    renderCart();
}

function removeItem(productId) {
    delete cart[productId];
    renderCart();
}

function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsElement.innerHTML = '';

    let totalPrice = 0;

    for (const productId in cart) {
        const listItem = document.createElement('li');
        listItem.textContent = `${productId}: ${cart[productId]} шт. `;
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.className = 'quantity-btn';
        plusButton.onclick = () => changeQuantity(productId, '+');
        listItem.appendChild(plusButton);
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.className = 'quantity-btn';
        minusButton.onclick = () => changeQuantity(productId, '-');
        listItem.appendChild(minusButton);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => removeItem(productId);
        listItem.appendChild(removeButton);
        cartItemsElement.appendChild(listItem);

        totalPrice += cart[productId] * prices[productId];
    }

    totalPriceElement.textContent = `Загальна ціна: ${totalPrice} грн`;

}


document.addEventListener("DOMContentLoaded", function() {
  const priceSlider = document.getElementById("price-slider");
  const priceDisplay = document.getElementById("price-display");

  priceSlider.addEventListener("input", function() {
      const value = priceSlider.value;
      priceDisplay.textContent = `0 грн - ${value} грн`;

      filterProducts(value);
  });

  function filterProducts(maxPrice) {
      const cards = document.querySelectorAll(".card");
      
      cards.forEach(function(card) {
          const priceText = card.querySelector(".card__price").textContent;
          const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
          
          if (price <= maxPrice) {
              card.style.display = "block";
          } else {
              card.style.display = "none";
          }
      });
  }
});


const tabItem = document.querySelectorAll('.tabs__btn-item');
const tabContent = document.querySelectorAll('.tabs__content-item');

tabItem.forEach(function(element) {
  element.addEventListener('click', open)
})
function open(evt) {
  const tabTarget = evt.currentTarget;
  const button = tabTarget.dataset.button;

  tabItem.forEach(function(item){
    item.classList.remove('tabs__btn-item--active');
  });

  tabTarget.classList.add('tabs__btn-item--active');

  tabContent.forEach(function(item) {
    item.classList.remove('tabs__content-item--active');
  });

  document.querySelector(`#${button}`).classList.add('tabs__content-item--active');
};

const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('menu__list--active');
});

const swiper = new Swiper(".swiper", {
  effect: "fade",
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
});



const app = {
  data: {
    cart: [
      { name: 'Товар 1', price: 100, quantity: 1 },
      { name: 'Товар 2', price: 150, quantity: 2 },
      { name: 'Товар 3', price: 200, quantity: 1 }
    ]
  },
  computed: {
    total() {
      return this.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    }
  },
  methods: {
    increaseQuantity(index) {
      this.cart[index].quantity++;
      this.updateCart();
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.updateCart();
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.updateCart();
    },
    updateCart() {
      console.log('Кошик оновлено:', this.cart);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
};

window.onload = function() {
  app.methods.updateCart();
};

