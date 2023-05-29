import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import FruitPreview from "./FruitPreview";
import Fruit from "../models/Fruit";
import FruitItem from "./FruitItem";
import "./FruitsMaster.css";

import axios from "axios";
import { Link } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://fruits.shrp.dev",
  timeout: 3000,
  headers: {},
});

function FruitsMaster() {
  const [fruits, setFruits] = useState([]); // Par défaut, la liste de fruits est vide
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [needToReload, setNeedToReload] = useState(false);
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleSelection = (fruitName) => {
    setSelectedFruits((prevSelectedFruits) => {
      const isSelected = prevSelectedFruits.includes(fruitName);
      if (isSelected) {
        return prevSelectedFruits.filter((name) => name !== fruitName);
      } else {
        return [...prevSelectedFruits, fruitName];
      }
    });
  };

  const calculateTotalPrice = () => {
    const total = selectedFruits.length;
    setTotalPrice(total);
  };

  async function onSubmitSearchForm(data) {
    const keyword = data.keyword;
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/items/fruits?search=${keyword}`);
      const collectionOfFruitItems = response.data.data.map(
        (jsonItem) => new Fruit(jsonItem.name, jsonItem.color, jsonItem.image, 1)
      );
      setFruits(collectionOfFruitItems);
      setLoading(false);
      setError(false);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  function onReloadData() {
    setNeedToReload(needToReload ? false : true); // Déclenche l'exécution de useEffect
  }

  useEffect(() => {
    async function fetchFruitsFromAPI() {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/items/fruits");
        const collectionOfFruitItems = response.data.data.map(
          (jsonItem) => new Fruit(jsonItem.name, jsonItem.color, jsonItem.image, 1)
        );
        setFruits(collectionOfFruitItems);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }

    fetchFruitsFromAPI();
  }, [needToReload]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedFruits]);

  return (
    <div className="FruitsMaster">
      <button onClick={() => onReloadData()}>Recharger les données</button>

      <form onSubmit={handleSubmit(onSubmitSearchForm)}>
        <input placeholder="Mot clé" {...register("keyword", { required: true })} />
        {errors.keyword && <span>Ce champ est obligatoire</span>}

        <input type="submit" value="Recherche" />
      </form>

      {loading && <p>Chargement...</p>}
      {error && <p>Une erreur s'est produite</p>}

      <div className="FruitsContainer">
        {fruits.map((fruit) => (
          <FruitItem
            key={fruit.name}
            fruit={fruit}
            isSelected={selectedFruits.includes(fruit.name)}
            toggleSelection={toggleSelection}
          />
        ))}
      </div>

      <div className="SelectedFruits">
        <h2>Panier</h2>
        <ul>
          {selectedFruits.map((fruitName) => (
            <li key={uuid()}>{fruitName}</li>
          ))}
        </ul>
        <p>Total : {totalPrice} €</p>
        <Link to="/salad">Voir la salade</Link>
      </div>
    </div>
  );
}

export default FruitsMaster;
