import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const meal = props.meal;
  const price = `$${meal.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const onAddToCartHandler = (amount) => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      amount: amount,
      price: meal.price,
    });
  };
  // const onCartRemoveItem = () => {
  //   cartCtx.removeItem(meal.id);
  // };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={meal.id} onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
