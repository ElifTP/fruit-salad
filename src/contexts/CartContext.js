// CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedFruits, setSelectedFruits] = useState([]);

  const clearCart = () => {
    setSelectedFruits([]);
  };

  const calculateAmount = () => {
    let totalAmount = 0;
    for (const fruit of selectedFruits) {
      totalAmount += fruit.price;
    }
    return totalAmount;
  };

  const addFruit = (fruit) => {
    setSelectedFruits((prevSelectedFruits) => [...prevSelectedFruits, fruit]);
  };

  const removeFruit = (fruit) => {
    setSelectedFruits((prevSelectedFruits) =>
      prevSelectedFruits.filter((f) => f.id !== fruit.id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        selectedFruits,
        setSelectedFruits,
        clearCart,
        calculateAmount,
        addFruit,
        removeFruit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
