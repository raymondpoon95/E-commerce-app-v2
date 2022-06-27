import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home";
import Navigation from "./routes/Navigation/Navigation";
import SignIn from "./routes/Sign-in/Signin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
