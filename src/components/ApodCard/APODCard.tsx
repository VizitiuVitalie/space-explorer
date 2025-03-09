import React from 'react';
import { useFavorites, Favorite } from '../../context/FavoriteContext';
import { Link } from 'react-router-dom';
import { APODDataI } from '../../shared/apod.interface';
import styles from './APODCard.module.css';

interface APODCardProps {
  data: APODDataI;
}

const APODCard: React.FC<APODCardProps> = ({ data }) => {
  const { addFavorite } = useFavorites();

  const handleAddFavorite = () => {
    const newFavorite: Favorite = { id: data.date, title: data.title, url: data.url };
    addFavorite(newFavorite);
  };

  return (
    <div className={styles.card}>
      <Link to={`/detail/${data.date}`}>
        <img src={data.url} alt={data.title} className={styles.image} />
      </Link>
      <div className={styles.content}>
        <Link to={`/detail/${data.date}`} className={styles.titleLink}>
          <h2>{data.title}</h2>
        </Link>
        <p>{data.date}</p>
        <p>{data.explanation.substring(0, 100)}...</p>
        <button onClick={handleAddFavorite}>Add to favorites</button>
      </div>
    </div>
  );
};

export default APODCard;