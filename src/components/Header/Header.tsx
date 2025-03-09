import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/mars-rover">Mars Rover Photos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
