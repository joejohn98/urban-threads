import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import { store } from "./store";
import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="max-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
