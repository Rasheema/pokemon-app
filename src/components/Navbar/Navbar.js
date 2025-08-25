// src/components/Navbar/Navbar.js
import React from "react";
import { Link } from "react-router-dom"; // import Link
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import whiteLogo from "../../assets/whitelogo.png";
import blackLogo from "../../assets/blacklogo.png";
import toggledark from "../../assets/toggledark.png";
import togglelight from "../../assets/togglelight.png";

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logo → Click to go Home */}
        <Link to="/">
          <img
            src={theme === "light" ? blackLogo : whiteLogo}
            alt="logo"
            className="logo"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="mb-0 nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favourite">Favourite</Link>
          </li>
          <li>
            <Link to="/minigame">Mini Game</Link>
          </li>
        </ul>

        {/* Search Bar */}
        <SearchBar />

        {/* Theme Toggle Icon */}
        <img
          onClick={toggle_mode}
          src={theme === "light" ? togglelight : toggledark}
          alt="toggle theme"
          className="toggle-icon"
        />
      </div>
    </div>
  );
};

export default Navbar;
