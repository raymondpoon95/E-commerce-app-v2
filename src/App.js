import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import { ProductsProvider } from "./contexts/products.context";
import { CartProvider } from "./contexts/cart.context";

import Home from "./routes/home/Home";
import Navigation from "./routes/Navigation/Navigation";
import Authentication from "./routes/Authentication/Authentication";
import Shop from "./routes/shop/Shop";

const App = () => {
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
};

export default App;
