import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductCatalog from "./components/ProductCatalog";
import OrderForm from "./components/OrderForm";
import OrderTracking from "./components/OrderTracking";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/order">Place Order</Link> |{" "}
        <Link to="/track">Track Order</Link> | <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/track" element={<OrderTracking />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
