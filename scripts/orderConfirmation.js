import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../scripts/utlis/money.js";
import {cart, updateCartQuantityDisplay} from "../data/cart.js"

// Get container
const ordersGrid = document.querySelector('.orders-grid');
ordersGrid.innerHTML = ''; // Clear hardcoded orders

const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

orderHistory.reverse().forEach((order, index) => {
  const orderId = crypto.randomUUID(); // Generate fake ID (for now)
  const orderDate = new Date(order.orderTime).toLocaleDateString();

  let orderHTML = `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCents)}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderId}</div>
        </div>
      </div>
      <div class="order-details-grid">
  `;

  order.cart.forEach((item) => {
    const product = getProduct(item.productId);
    const delivery = getDeliveryOption(item.deliveryOptionId);
    const deliveryDate = new Date(new Date(order.orderTime).getTime() + delivery.deliveryDays * 86400000);

    orderHTML += `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-delivery-date">Arriving on: ${deliveryDate.toLocaleDateString()}</div>
        <div class="product-quantity">Quantity: ${item.quantity}</div>
        <button class="buy-again-button button-primary js-buy-again-button"
          data-product-id="${product.id}"
          data-quantity="${item.quantity}">
          <img class="buy-again-icon" src="../images/icons/buy-again.png" alt="Buy Again">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>
      <div class="product-actions">
        <a href="tracking.html?orderId=${orderId}&productId=${product.id}">
          <button class="track-package-button button-secondary">Track package</button>
        </a>
      </div>
    `;

  });

  orderHTML += `
      </div> <!-- .order-details-grid -->
    </div> <!-- .order-container -->
  `;


  ordersGrid.innerHTML += orderHTML;
  // Attach event listeners to "Buy it again" buttons
  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantity = Number(button.dataset.quantity);

      let existingItem = cart.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // ✅ Immediately update cart quantity on the header
      updateCartQuantityDisplay();

      // Optional: give user feedback
      alert('Item added to cart again!');
    });

  });
});
updateCartQuantityDisplay(); // Update cart quantity in header