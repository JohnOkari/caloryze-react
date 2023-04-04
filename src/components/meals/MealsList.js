import React, { useState, useEffect } from "react";
import AddMeal from "../AddMeal/AddMeal";
import "./MealsList.css";

const MealsList = ({ user }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    fetch("/meals")
      .then((response) => response.json())
      .then((meals) => setMeals(meals))
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (updatedData) => {
    // Send a PUT request to update the selected meal data on the server
    fetch(`/meals/${updatedData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the local meals state with the updated data
        const updatedMeals = meals.map((meal) =>
          meal.id === data.id ? data : meal
        );
        setMeals(updatedMeals);
        setSelectedMeal(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (mealId) => {
    // Send a DELETE request to delete the selected meal data from the server
    fetch(`/meals/${mealId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the local meals state by removing the selected meal data
        const updatedMeals = meals.filter((meal) => meal.id !== mealId);
        setMeals(updatedMeals);
      })
      .catch((error) => console.error(error));
  };
  
  const handleAdd = (newMeal) => {
    setMeals([...meals, newMeal]);
  };

  return (
    <>
      <p className="total">
        Total Calories:
        <span> {meals.reduce((total, meal) => total + meal.calories, 0)}</span>
      </p>

      <div className="meal-container">
        <div className="add-meal-container">
          <AddMeal onAdd={handleAdd} user={user} />
        </div>
        <div className="meal-table-container">
          <table className="meals-table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Meal Type</th>
                <th>Calories</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal.id}>
                  <td>
                    {selectedMeal && selectedMeal.id === meal.id ? (
                      <input
                        type="text"
                        value={selectedMeal.food}
                        onChange={(event) =>
                          setSelectedMeal({
                            ...selectedMeal,
                            food: event.target.value,
                          })
                        }
                      />
                    ) : (
                      meal.food
                    )}
                  </td>
                  <td>
                    {selectedMeal && selectedMeal.id === meal.id ? (
                      <select
                        value={selectedMeal.meal_type}
                        onChange={(event) =>
                          setSelectedMeal({
                            ...selectedMeal,
                            meal_type: event.target.value,
                          })
                        }
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                      </select>
                    ) : (
                      meal.meal_type
                    )}
                  </td>
                  <td>
                    {selectedMeal && selectedMeal.id === meal.id ? (
                      <input
                        type="number"
                        value={selectedMeal.calories}
                        onChange={(event) =>
                          setSelectedMeal({
                            ...selectedMeal,
                            calories: parseInt(event.target.value),
                          })
                        }
                      />
                    ) : (
                      meal.calories
                    )}
                  </td>
                  <td>
                    {selectedMeal && selectedMeal.id === meal.id ? (
                      <>
                        <button onClick={() => handleEdit(selectedMeal)}>
                          Save
                        </button>
                        <button onClick={() => setSelectedMeal(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => setSelectedMeal(meal)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(meal.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default MealsList;
