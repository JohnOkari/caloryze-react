import React, { useState } from "react";
import './AddMeal.css'

const AddMeal = ({ onAdd, user }) => {
  const [food, setFood] = useState("");
  const [mealType, setMealType] = useState("");
  const [calories, setCalories] = useState("");
  // console.log(user)

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMeal = {
      food: food,
      meal_type: mealType,
      calories: parseInt(calories),
      user_id: user.id
    };

    fetch("/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeal),
    })
      .then((response) => response.json())
      .then((data) => {
        onAdd(data);
        console.log(data)
        setFood("");
        setMealType("");
        setCalories("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="meal-form">
      <h2>Add a New Meal</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Food:
          <input
            type="text"
            className="form-input"
            value={food}
            onChange={(event) => setFood(event.target.value)}
          />
        </label>
        <label className="form-label">
          Meal Type:
          <select
            className="form-input"
            value={mealType}
            onChange={(event) => setMealType(event.target.value)}
          >
            <option value="">Choose a meal type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </label>
        <label className="form-label">
          Calories:
          <input
            type="number"
            className="form-input"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
          />
        </label>
        <button className="form-button" type="submit">
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
