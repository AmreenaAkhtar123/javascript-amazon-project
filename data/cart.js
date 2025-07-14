export let cart;
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

loadFromStorage();


export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
  cart = [];
  }

}


///////////local storage//////////

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

////////////////function add to cart///////////////
export function addToCart(productId){
  let matchingItem;

      cart.forEach((cartItem) =>{
        if (productId === cartItem.productId){
          matchingItem = cartItem;

        }
      });

      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`);


      const quantity = Number(quantitySelector.value);
                                                                                      

      if(matchingItem){
         matchingItem.quantity +=1;
      }
      else{
        cart.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
      }
      saveToStorage();
}


export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    } 
  });

  cart = newCart;

  saveToStorage();
}
export function updateCartQuantityDisplay() {
  const cartQuantity = calculateCartQuantity();
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerText = cartQuantity;
  }
}


export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;

  });
  return cartQuantity;

}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
  renderPaymentSummary();
}

export function updateDeliveryOption(productId, deliveryOptionId){

  let matchingItem;

    cart.forEach((cartItem) =>{
      if (productId === cartItem.productId){
        matchingItem = cartItem;

      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();

}