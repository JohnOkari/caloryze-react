import React, { useState } from "react";
import MealsList from "../../components/meals/MealsList";
import "./home.css";

function Home({ user }) {
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setDailyCalorieGoal(inputValue);
    setInputValue("");
  };

  return (
    <>
      <div className="home">
        <div className="goal-container">
          <form onSubmit={handleFormSubmit}>
            <label className="goal-label" htmlFor="dailyCalorieGoalInput">
              Set Daily Calorie Goal:
            </label>
            <input
              className="goal-input"
              type="number"
              id="dailyCalorieGoalInput"
              name="dailyCalorieGoalInput"
              value={inputValue}
              onChange={handleInputValueChange}
            />
            <button className="submit-button" type="submit">
              Set
            </button>
          </form>
        </div>
        <p className="daily-goal">
          Daily Calorie Goal:{" "}
          <span className="calorie-count">{dailyCalorieGoal}</span>
        </p>
        <MealsList
          className="meals-list"
          user={user}
          dailyCalorieGoal={dailyCalorieGoal}
        />
        
      </div>
    </>
  );
}

export default Home;
