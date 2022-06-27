import { createContext, useState } from "react";

const initialState = {
  isCartOpen: false,
  setIsOpen: () => {},
};

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
