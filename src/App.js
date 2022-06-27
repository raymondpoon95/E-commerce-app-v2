import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home";
import Navigation from "./routes/Navigation/Navigation";
import Authentication from "./routes/Authentication/Authentication";
import { UserProvider } from "./contexts/user.context";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            {/* <Route path="/shop" element={<Shop />} /> */}
            <Route path="auth" element={<Authentication />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
