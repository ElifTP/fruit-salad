import "./App.css";
import FruitsMaster from "./components/FruitsMaster";
import { useState } from "react";
import { CartProvider } from "./contexts/CartContext";
import Salad from "./Salad";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function App() {
  const [displayList, setDisplayList] = useState(false);
  //par défaut displayList a la valeur false
  //donc on cache la liste

  function onClick() {
    setDisplayList(displayList ? false : true);
    //condition ternaire
  }

  return (
    <div className="App">
      <button onClick={() => onClick()}>Afficher / Masquer</button>

      {/* {displayList && <FruitsMaster />}
      {!displayList && <p>Pas de fruit</p>} */}

      {displayList === true && <FruitsMaster />}
    </div>

  );

}

export default App;
