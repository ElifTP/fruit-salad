import React from "react";

function FruitItem({ fruit, isSelected, toggleSelection }) {
  const handleToggleSelection = () => {
    toggleSelection(fruit.name);
  };

  return (
    <div className={`FruitItem ${isSelected ? "selected" : ""}`}>
      <img src={fruit.image} alt={fruit.name} />
      <h3>{fruit.name}</h3>
      <p>Couleur : {fruit.color}</p>
      <p>Prix : {fruit.price} €</p>
      <button onClick={handleToggleSelection}>
        {isSelected ? "Deselect" : "Select"}
      </button>
    </div>
  );
}

export default FruitItem;
