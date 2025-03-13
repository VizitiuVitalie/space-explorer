import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Embark on a Cosmic Adventure
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Explore the Universe
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Step beyond the ordinary and experience the wonders of the cosmos. Discover breathtaking views and unforgettable moments among the stars.
        </motion.p>
      </header>
      <motion.button
        className={styles.exploreButton}
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        Begin Your Journey
      </motion.button>
      {menuOpen && (
        <motion.div
          className={styles.menu}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul>
            <li>
              <motion.a whileHover={{ scale: 1.1 }} href="/apod">
                Astronomy Picture of the Day
              </motion.a>
            </li>
            <li>
              <motion.a whileHover={{ scale: 1.1 }} href="/mars-rover">
                Mars Rover Photos
              </motion.a>
            </li>
            <li>
              <motion.a whileHover={{ scale: 1.1 }} href="/favorites">
                Favorites
              </motion.a>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
