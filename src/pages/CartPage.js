import React, { useState, useEffect } from "react";
import { IoManSharp, IoWoman } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
  }, []);

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    const selectedItem = updatedCart[index];


    if (newQuantity > selectedItem.quantity) {
      alert(`Only ${selectedItem.quantity} items left in stock for ${selectedItem.name}.`);
      return;
    }


    selectedItem.selectedQuantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.selectedQuantity || 1),
      0
    );
  };

  const handleGoToProduct = () => {
    navigate("/");
  }

  return (
    <div>
      <header>
        <h1>Cart Page</h1>
        <button className="cart-button" onClick={handleGoToProduct}>
          Go to Products
        </button>
      </header>
      {cart.length > 0 ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "150px",
                  maxWidth: "200px",
                  position: "relative",
                }}
              >

                <FaTrash
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => handleRemoveItem(index)}
                />

                <img
                  src={item.imageURL}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <h4 style={{ margin: "0" }}>{item.name}</h4>
                  {item.gender === "Men" ? (
                    <IoManSharp style={{ marginLeft: "8px" }} />
                  ) : (
                    <IoWoman style={{ marginLeft: "8px" }} />
                  )}
                </div>
                <p>
                  {item.price} <span style={{ fontSize: "10px" }}>{item.currency}</span>
                </p>
                <p style={{ color: "red", margin: "5px 0" }}>
                  Items left: {item.quantity}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <label htmlFor={`quantity-${index}`} style={{ marginRight: "10px" }}>
                    Quantity:
                  </label>
                  <input
                    id={`quantity-${index}`}
                    type="number"
                    value={item.selectedQuantity || 1}
                    min="1"
                    max={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value, 10))
                    }
                    style={{
                      width: "50px",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "3px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "20px",
              textAlign: "left",
            }}
          >
            <h4>Items Total:</h4>
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {cart.map((item, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  {item.name} - {item.price.toFixed(2)} x{" "}
                  {item.selectedQuantity || 1} ={" "}
                  {(item.price * (item.selectedQuantity || 1)).toFixed(2)}{" "}
                  {item.currency}
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Total: {calculateTotal().toFixed(2)} Rupees
            </div>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No items in cart</p>
      )}
    </div>
  );
};

export default CartPage;
