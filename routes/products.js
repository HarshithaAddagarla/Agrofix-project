const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});

// Add a product (admin)
router.post("/", async (req, res) => {
  const { name, price } = req.body;
  try {
    await pool.query("INSERT INTO products (name, price) VALUES ($1, $2)", [
      name,
      price,
    ]);
    res.send("Product added successfully");
  } catch (err) {
    res.status(500).send("Error adding product");
  }
});

module.exports = router;
