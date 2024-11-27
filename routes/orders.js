const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Place an order
router.post("/", async (req, res) => {
  const { productId, quantity, buyerName, contact, address } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO orders (product_id, quantity, buyer_name, contact, address, status) VALUES ($1, $2, $3, $4, $5, 'Pending') RETURNING *",
      [productId, quantity, buyerName, contact, address]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Error placing order");
  }
});

// Get all orders (admin)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error fetching orders");
  }
});

// Update order status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
    res.send("Order status updated");
  } catch (err) {
    res.status(500).send("Error updating order status");
  }
});

module.exports = router;
