import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utlis/money.js';

let productHTML = '';
// Assuming products is an array of product objects
// Example structure of a product object:
  /*
  {
    name: "Product Name",
    image: "path/to/image.jpg",
    rating: {
      stars: 4.5,
      count: 100
    },
    priceCents: 1999,
    quantity: 1
  }
  */





products.forEach((product) => {
  productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars *10
              }.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class= "js-quantity-selector-${product.id}" >
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

         <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
            Add to Cart 
          </button>
        </div>
  
  `;

});


//console.log(productHTML);
document.querySelector('.js-product-grid').innerHTML = productHTML;


const addedMessageTimeouts = {};
 


function updateCartQuantity(productId){
let addedMessageTimeoutId;


      let cartQuantity = 0;
      cart.forEach((cartItem) =>{
        cartQuantity += cartItem.quantity;

      });



      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);


      addedMessage.classList.add('added-to-cart-visible');


      /*setTimeout(() =>{
        addedMessage.classList.remove('added-to-cart-visible');
      },2000);
      */
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      console.log(cartQuantity);


      console.log(cart);


}

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener('click', () => {
      //console.log(button.dataset)
      const {productId} = button.dataset;
      //console.log(productName);
     
      addToCart(productId);
      updateCartQuantity(productId);

      
    });



    
});