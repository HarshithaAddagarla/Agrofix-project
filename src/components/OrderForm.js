import React, { useEffect, useState } from "react";
import './OrderForm.css';


// Fallback list of fruits and vegetables (declared outside the component)
const fallbackProducts = [
  { id: "amaranth", name: "Amaranth Leaves" },
  { id: "ash_gourd", name: "Ash Gourd" },
  { id: "banana", name: "Banana" },
  { id: "beetroot", name: "Beetroot" },
  { id: "bittergourd", name: "Bitter Gourd" },
  { id: "bottle_gourd", name: "Bottle Gourd" },
  { id: "brinjal", name: "Brinjal" },
  { id: "broccoli", name: "Broccoli" },
  { id: "cabbage", name: "Cabbage" },
  { id: "carrot", name: "Carrot" },
  { id: "cauliflower", name: "Cauliflower" },
  { id: "celery", name: "Celery" },
  { id: "coriander", name: "Coriander (Cilantro)" },
  { id: "cucumber", name: "Cucumber" },
  { id: "drumstick", name: "Drumstick" },
  { id: "fenugreek", name: "Fenugreek Leaves (Methi)" },
  { id: "garlic", name: "Garlic" },
  { id: "ginger", name: "Ginger" },
  { id: "grapes", name: "Grapes" },
  { id: "green_chillies", name: "Green Chillies" },
  { id: "ivy_gourd", name: "Ivy Gourd" },
  { id: "kiwi", name: "Kiwi" },
  { id: "kohlrabi", name: "Kohlrabi (Knol-Khol)" },
  { id: "lemon", name: "Lemon" },
  { id: "lettuce", name: "Lettuce" },
  { id: "mint", name: "Mint" },
  { id: "mushroom", name: "Mushroom" },
  { id: "mustard_greens", name: "Mustard Greens (Sarson)" },
  { id: "okra", name: "Okra (Ladyfinger)" },
  { id: "onion", name: "Onion" },
  { id: "orange", name: "Orange" },
  { id: "peas", name: "Peas" },
  { id: "peach", name: "Peach" },
  { id: "pepper", name: "Pepper" },
  { id: "pointed_gourd", name: "Pointed Gourd (Parwal)" },
  { id: "potato", name: "Potato" },
  { id: "pumpkin", name: "Pumpkin" },
  { id: "radish", name: "Radish" },
  { id: "ridge_gourd", name: "Ridge Gourd" },
  { id: "snake_gourd", name: "Snake Gourd" },
  { id: "spinach", name: "Spinach" },
  { id: "spring_onion", name: "Spring Onion" },
  { id: "squash", name: "Squash" },
  { id: "sweet_potato", name: "Sweet Potato" },
  { id: "tomato", name: "Tomato" },
  { id: "turmeric", name: "Raw Turmeric" },
  { id: "turnip", name: "Turnip" },
  { id: "watermelon", name: "Watermelon" },
  { id: "yam", name: "Yam" },
  { id: "zucchini", name: "Zucchini" }
];


const OrderForm = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    buyer_name: "",
    contact: "",
    address: "",
  });
  const [products, setProducts] = useState([]);

  // Fetch products from the API or use the fallback list
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setProducts(fallbackProducts); // Use fallback if no data is returned
        } else {
          setProducts(data);
          setFormData((prevData) => ({
            ...prevData,
            product_id: data[0].id, // Automatically select the first product
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts(fallbackProducts); // Use fallback in case of error
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.product_id) {
      alert("Please select a valid product.");
      return;
    }

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log("Order placed:", data))
      .catch((error) => console.error("Error placing order:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place an Order</h2>

      {/* Dropdown for product selection */}
      <label htmlFor="product_id">Select a Product</label>
      <select
        name="product_id"
        id="product_id"
        value={formData.product_id}
        onChange={handleChange}
        required
      >
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="buyer_name"
        placeholder="Name"
        value={formData.buyer_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        value={formData.contact}
        onChange={handleChange}
      />
      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
