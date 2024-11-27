import React, { useState } from "react";
import './OrderTracking.css';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = () => {
    // Clear previous state
    setOrder(null);
    setError("");

    if (!orderId.trim()) {
      setError("Please enter a valid Order ID.");
      return;
    }

    // Make API request to fetch the order details
    fetch(`http://localhost:5000/orders/${orderId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Debugging: Check the response in console
        if (data && Object.keys(data).length > 0) {
          setOrder(data);
        } else {
          setError("No order details found.");
        }
      })
      .catch((err) => {
        console.error("Error tracking order:", err);
        setError(
          "Unable to track order. Please check the Order ID or try again later."
        );
      });
  };

  return (
    <div className="body_tracking">
    <div className="container">
      <h2>Track Your Order</h2>
      <input
        type="text"
        placeholder="Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={handleTrackOrder}>Track</button>

      {/* Display error message */}
      {error && <p>{error}</p>}

      {/* Display order details if available */}
      {order && (
        <div>
          <h3>Order Details</h3>
          <p><strong>Status:</strong> {order.status || "N/A"}</p>
          <p><strong>Product ID:</strong> {order.productId || "N/A"}</p>
          <p><strong>Quantity:</strong> {order.quantity || "N/A"}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default OrderTracking;
