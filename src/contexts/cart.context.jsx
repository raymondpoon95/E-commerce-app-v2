import { createContext, useState, useEffect } from "react";

const initialState = {
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
};

const addCartItem = (cartItems, productToAdd) => {
  // 1. find if product exists in cartItems
  // 2. if found increment the quantity of product in cart
  // 3. return new array with modified cartItems/new cart item

  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      if (cartItem.id === productToAdd.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      } else {
        return cartItem;
      }
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// const removeCartItem = (cartItems, productToRemove) => {
//   // 1. if found filter out the product from the cart
//   // 2. return new array with modified cartItems/new cart item

//   return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
// }

// const increaseQuantity = (cartItems, product) => {

// }

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((total, cartItem) => {
      return (total += cartItem.quantity);
    }, 0);
    setTotalProducts(total);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    cartItems,
    totalProducts,
    setIsCartOpen,
    addItemToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
