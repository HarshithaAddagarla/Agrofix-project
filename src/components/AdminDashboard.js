import React, { useEffect, useState } from "react";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  // Fetch orders
  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const updateOrderStatus = (orderId, status) => {
    fetch(`http://localhost:5000/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      })
      .catch((error) => console.error("Error updating order:", error));
  };

  const addProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prevProducts) => [...prevProducts, data]);
        setNewProduct({ name: "", price: "" });
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="admin-container">
      {/* Products Section */}
      <form onSubmit={addProduct}>
      <h1>Admin Dashboard</h1>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <button type="submit" className="button_admin">Add Product</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>

      {/* Orders Section */}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => updateOrderStatus(order.id, "In Progress")}>
              Mark as In Progress
            </button>
            <button onClick={() => updateOrderStatus(order.id, "Delivered")}>
              Mark as Delivered
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
