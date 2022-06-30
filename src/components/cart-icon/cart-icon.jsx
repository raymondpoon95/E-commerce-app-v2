import React, { useContext } from "react";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, totalProducts } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{totalProducts}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
