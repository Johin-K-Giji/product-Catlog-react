import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import axios from "axios";

const ProductList = ({ filters, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products, filters]);

  const fetchProducts = () => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const filterProducts = () => {
    let filtered = products;


    const lowercasedTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedTerm) ||
        product.color.toLowerCase().includes(lowercasedTerm)
    );


    if (filters.price === "low-to-high") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.price === "high-to-low") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }


    if (filters.gender) {
      filtered = filtered.filter(
        (product) => product.gender && product.gender.toLowerCase() === filters.gender
      );
    }

    if (filters.color) {
      filtered = filtered.filter(
        (product) => product.color && product.color.toLowerCase() === filters.color
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="product-list">
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <div className="products">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
