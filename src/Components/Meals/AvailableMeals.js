import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setError(null);

      const response = await fetch(
        "https://react-http-52460-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong !");
      }

      const data = await response.json();
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: data[key].id,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);

      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  const mealsList = meals.map((meal) => <MealItem meal={meal} key={meal.id} />);

  let content = <p>No meals found</p>;

  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
