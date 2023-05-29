import React from "react";

function Salad({ saladItems }) {
  return (
    <div>
      <h1>Contenu de la salade</h1>
      <ul>
        {saladItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Salad;
