import React from 'react';
import { useFavorites } from '../../context/FavoriteContext';
import styles from './FavoritesPage.module.css';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className={styles.container}>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>empty for now...</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((fav) => (
            <li key={fav.id} className={styles.item}>
              <h3>{fav.title}</h3>
              <img src={fav.url} alt={fav.title} className={styles.image} />
              <button onClick={() => removeFavorite(fav.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
