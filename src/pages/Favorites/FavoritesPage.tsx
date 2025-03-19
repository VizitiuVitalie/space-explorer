import React from 'react';
import { useFavorites } from '../../context/FavoriteContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './FavoritesPage.module.css';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className={styles.favoritesTitle}>Favorites</h1>
      {favorites.length === 0 ? (
        <p>empty for now...</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((fav) => (
            <motion.li
              key={fav.id}
              className={styles.item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/details/${fav.id}`} className={styles.titleLink}>
                <img src={fav.url} alt={fav.title} className={styles.image} />
                <h3 className={styles.title}>{fav.title}</h3>
                <p className={styles.date}>{fav.id}</p>
              </Link>
              <div className={styles.buttonContainer}>
                <button className={styles.deleteButton} onClick={() => removeFavorite(fav.id)}>Delete</button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default FavoritesPage;