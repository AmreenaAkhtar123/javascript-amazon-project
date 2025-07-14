import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOption.js";
import {cart, updateCartQuantityDisplay} from "../data/cart.js"

// Get product & order ID from URL
const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");

// Load order history
const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];


let matchingOrder, matchingItem;

// Find matching order and item by productId
for (const order of orderHistory) {
  for (const item of order.cart) {
    if (item.productId === productId) {
      matchingOrder = order;
      matchingItem = item;
      break;
    }
  }
  if (matchingItem) break;
}

if (matchingOrder && matchingItem) {
  const product = getProduct(matchingItem.productId);
  const delivery = getDeliveryOption(matchingItem.deliveryOptionId);

  const orderTime = new Date(matchingOrder.orderTime);
  const arrivalDate = new Date(orderTime.getTime() + delivery.deliveryDays * 86400000);
  const daysSinceOrder = Math.floor((new Date() - orderTime) / (1000 * 60 * 60 * 24));

  // Update delivery info
  document.querySelector('.delivery-date').innerText =
    `Arriving on ${arrivalDate.toLocaleDateString()}`;
  document.querySelectorAll('.product-info')[0].innerText = product.name;
  document.querySelectorAll('.product-info')[1].innerText = `Quantity: ${matchingItem.quantity}`;
  document.querySelector('.product-image').src = product.image;
  document.querySelector('.product-image').alt = product.name;

  // Determine shipping status
  let currentStatus = 'Preparing';
  if (daysSinceOrder >= 1) currentStatus = 'Shipped';
  if (daysSinceOrder >= delivery.deliveryDays) currentStatus = 'Delivered';

  // Highlight the current progress step
  document.querySelectorAll('.progress-label').forEach((label) => {
    label.classList.remove('current-status');
    if (label.dataset.status === currentStatus) {
      label.classList.add('current-status');
    }
  });

  // Update progress bar width
  const progressPercent = {
    'Preparing': '33%',
    'Shipped': '66%',
    'Delivered': '100%'
  };
  document.querySelector('.js-progress-bar').style.width = progressPercent[currentStatus];

} else {
  document.querySelector('.order-tracking').innerHTML = `
    <p>Order or Product not found.</p>
    <a href="orders.html" class="link-primary">Back to orders</a>
  `;
}
updateCartQuantityDisplay();

