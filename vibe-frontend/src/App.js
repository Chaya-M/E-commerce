import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MyOrders from "./components/MyOrders";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6 font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/cart" element={<Home />} />
          <Route path="/orders" element={<MyOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
