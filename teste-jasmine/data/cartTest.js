import {addToCart,
  cart,
  loadFromStorage
} from "../../data/cart.js";


describe('Test suite: addToCart', ()=>{
  it('add an existing product to the cart', ()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: 1
      }]);
    });
    loadFromStorage();
    const fakeInput = document.createElement('input');
    fakeInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    fakeInput.value = 1;
    document.body.appendChild(fakeInput);

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);

    // Clean up
    document.body.removeChild(fakeInput);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart[0].quantity).toEqual(2);

    
    
  });

  it('add a new product to the cart', () => {
    spyOn(localStorage, 'setItem');
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    // Add a fake quantity selector to mock the DOM input
    const fakeInput = document.createElement('input');
    fakeInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    fakeInput.value = 1;
    document.body.appendChild(fakeInput);

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);

    // Clean up
    document.body.removeChild(fakeInput);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart[0].quantity).toEqual(1);
  });

});
