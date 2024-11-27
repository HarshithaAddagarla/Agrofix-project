import React, { useEffect, useState } from "react";
import './ProductCatalog.css';


const ProductCatalog = () => {
  const [setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="ProductCatalog">
      <h1 className="h1_P">.</h1>
    </div>
  );
};

export default ProductCatalog;
