import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        onLogout();

        navigate("/"); // redirect to login page
      })
      .catch((err) => console.log(err));
        window.location.reload();
  };

  return (
    <nav className="logout-navbar">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default LogoutButton;
