import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const handleClick = () => {
    const navbar = document.getElementById("navbar");
    navbar?.classList.toggle(styles.open);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img src={logo} alt="space" title="Travel to Space" />
        </NavLink>
      </div>
      <nav id="navbar" className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/apod"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              APOD
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mars-rover"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Mars Rover Photos
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.menu}>
        <button id="menu" onClick={handleClick} className={styles.menuButton}>
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;