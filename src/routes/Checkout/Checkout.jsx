import React, { useContext } from "react";
import "./checkout.styles.scss";

import { CartContext } from "../../contexts/cart.context";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  return (
    <div>
      <h2>I am the checkout page</h2>
      <div>
        {cartItems.map((cartItem) => {
          const { name, quantity, id } = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br />
              <span onClick={() => removeItemToCart(cartItem)}>decrease</span>
              <br />
              <span onClick={() => addItemToCart(cartItem)}>increase</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
