import {cart} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utlis/money.js";

export function renderPaymentSummary(){
  //console.log('working');
  let productPriceCents = 0;
  let ShippingPriceCents = 0;

  cart.forEach((cartItem)=> {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;


    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    ShippingPriceCents += deliveryOption.priceCents;


  });

  //console.log(productPriceCents/100);
  //console.log(ShippingPriceCents/100);

  const totalBeforeTax = productPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax +taxCents;

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });


  const paymentSummaryHTML = `
  <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">
      $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $${formatCurrency(ShippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalBeforeTax)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  `;


  document.querySelector(`.js-payment-summary`).innerHTML = paymentSummaryHTML;
  document.querySelector('.place-order-button')
  .addEventListener('click', () => {
    // 🔍 Check if cart is empty
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return; // stop further execution
    }

    const order = {
      cart,
      productPriceCents,
      ShippingPriceCents,
      taxCents,
      totalCents,
      orderTime: new Date().toISOString()
    };

    // Save for confirmation page if needed
    localStorage.setItem('orderSummary', JSON.stringify(order));

    // Save to order history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    // Clear the cart
    localStorage.removeItem('cart');
    cart.length = 0;

    // Update cart quantity on header
    const cartQuantityEl = document.querySelector('.js-cart-quantity');
    if (cartQuantityEl) {
      cartQuantityEl.innerText = '0';
    }

    // Redirect
    window.location.href = 'orders.html';
  });
  document.querySelector('.js-cart-quantity').innerText = cartQuantity;
  document.querySelector('.js-order-error-message').textContent = 'Your cart is empty. Please add items before placing an order.';


  
}


