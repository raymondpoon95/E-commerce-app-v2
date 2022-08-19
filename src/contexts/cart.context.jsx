import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const initialState = {
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  totalProducts: 0,
  total: 0,
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

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToRemove.id;
  });

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) => {
    if (cartItem.id === productToRemove.id) {
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    }
    return cartItem;
  });
};

const clearCartItem = (cartItems, productToRemove) =>
  cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

export const CartContext = createContext(initialState);

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  totalProducts: 0,
  total: 0,
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...action.payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: action.payload,
      };
    default:
      return state;
  }
};

// CART PROVIDER
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, isCartOpen, totalProducts, total } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newTotal = newCartItems.reduce((total, cartItem) => {
      return (total += cartItem.quantity);
    }, 0);

    const newTotalCost = newCartItems.reduce((total, cartItem) => {
      return (total += cartItem.quantity * cartItem.price);
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        totalProducts: newTotal,
        total: newTotalCost,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (action) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, action));
  };

  const value = {
    isCartOpen,
    cartItems,
    totalProducts,
    total,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
