import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    price: "",
    gender: "",
  });
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);


  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? value : "",
    }));
  };

  const addToCart = (product) => {
    console.log("Checkpoint Check");

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(` ${product.name} added sucessfully to cart`)
  };

  const handleGoToCart = () => {

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="main-container">
      <header>
        <h1>Product Page</h1>
        <button className="cart-button" onClick={handleGoToCart}>
          Go to Cart
        </button>
      </header>
      <div className="content">
        <div className="filter-section">
          <Filter filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="product-section">
          <ProductList filters={filters} addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
