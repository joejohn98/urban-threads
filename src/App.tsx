import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import { store } from "./store";
import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="max-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
        </div>
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;
