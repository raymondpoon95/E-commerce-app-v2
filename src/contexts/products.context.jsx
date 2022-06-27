import { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.json";

const initialState = {
  products: [],
};

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = { products };

  //   useEffect(() => {}, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
