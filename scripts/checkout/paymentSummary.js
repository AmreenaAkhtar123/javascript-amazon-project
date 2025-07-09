import {cart} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utlis/money.js";

export function renderPaymentSummary(){
  console.log('working');
  let productPriceCents = 0;
  let ShippingPriceCents = 0;

  cart.forEach((cartItem)=> {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;


    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    ShippingPriceCents += deliveryOption.priceCents;


  });

  console.log(productPriceCents/100);
  console.log(ShippingPriceCents/100);

  const totalBeforeTax = productPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax +taxCents;


  const paymentSummaryHTML = `
  <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
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

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;


  document.querySelector(`.js-payment-summary`).innerHTML = paymentSummaryHTML;
}