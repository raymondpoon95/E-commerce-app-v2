import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home";
import Navigation from "./routes/Navigation/Navigation";
import Authentication from "./routes/Authentication/Authentication";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
