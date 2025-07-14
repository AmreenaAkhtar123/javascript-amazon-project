import {
  cart,
  addToCart,
  calculateCartQuantity,
  updateCartQuantityDisplay
} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utlis/money.js';

const productGrid = document.querySelector('.js-product-grid');
const searchInput = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');

// --- Render Products ---
function renderProducts(productList) {
  let productHTML = '';

  productList.forEach((product) => {
    productHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            ${[...Array(10).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  productGrid.innerHTML = productHTML;

  // Add event listeners after rendering
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      showAddedMessage(productId);
      updateCartQuantityDisplay();
    });
  });
}

// --- Show "Added to Cart" Message ---
const addedMessageTimeouts = {};

function showAddedMessage(productId) {
  const messageEl = document.querySelector(`.js-added-to-cart-${productId}`);
  if (!messageEl) return;

  messageEl.classList.add('added-to-cart-visible');

  // Clear existing timeout for this product
  if (addedMessageTimeouts[productId]) {
    clearTimeout(addedMessageTimeouts[productId]);
  }

  // Hide the message after 2 seconds
  addedMessageTimeouts[productId] = setTimeout(() => {
    messageEl.classList.remove('added-to-cart-visible');
  }, 2000);
}

// --- Search Handling ---
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    (product.keywords && product.keywords.some(keyword =>
      keyword.toLowerCase().includes(query)))
  );

  if (filtered.length === 0) {
    productGrid.innerHTML = `<p class="no-results">No products found.</p>`;
  } else {
    renderProducts(filtered);
  }
}

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});

// --- Initial Load ---
renderProducts(products);
updateCartQuantityDisplay();
