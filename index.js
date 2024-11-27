const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "127.0.0.1", // Use IPv4 (127.0.0.1) instead of ::1
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Ensure DB_PORT is set or fallback to default port 3306
});

// Test Database Connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the MySQL database!");
  }
});

// Routes
// Fetch all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.message);
      res.status(500).send("Error fetching products");
    } else {
      res.json(results);
    }
  });
});

// Add a product
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  db.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    (err, results) => {
      if (err) {
        console.error("Error adding product:", err.message);
        res.status(500).send("Error adding product");
      } else {
        res.status(201).json({ id: results.insertId, name, price });
      }
    }
  );
});

// Fetch all orders
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err.message);
      res.status(500).send("Error fetching orders");
    } else {
      res.json(results);
    }
  });
});

// Add an order
app.post("/orders", (req, res) => {
  const { product_id, quantity, buyer_name, contact, address } = req.body;
  db.query(
    "INSERT INTO orders (product_id, quantity, buyer_name, contact, address) VALUES (?, ?, ?, ?, ?)",
    [product_id, quantity, buyer_name, contact, address],
    (err, results) => {
      if (err) {
        console.error("Error placing order:", err.message);
        res.status(500).send("Error placing order");
      } else {
        res.status(201).json({ id: results.insertId });
      }
    }
  );
});

// Update order status
app.put("/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, id],
    (err) => {
      if (err) {
        console.error("Error updating order status:", err.message);
        res.status(500).send("Error updating order status");
      } else {
        res.send("Order status updated successfully");
      }
    }
  );
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
