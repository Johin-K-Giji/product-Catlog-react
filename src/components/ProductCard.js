import React from "react";

import { IoManSharp, IoWoman } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product); 
  };

  return (
    <div className="product-card">
      <img src={product.imageURL} alt={product.name} />
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <h3>{product.name}</h3>
        {product.gender === "Men" ? (
          <IoManSharp style={{ marginLeft: "8px" }} />
        ) : (
          <IoWoman style={{ marginLeft: "8px" }} />
        )}
      </div>
      <p>
        {product.price} <span style={{ fontSize: "10px" }}>{product.currency}</span>
      </p>
      <p style={{color:"red"}}>
        item Left :{product.quantity}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: "1px",
          border: "solid",
          padding: 5,
          cursor: "pointer",
          justifyContent:"center"
        }}
        onClick={handleAddToCart}
      >
        <FaCartPlus size={20} />
      </div>
    </div>
  );
};

export default ProductCard;
