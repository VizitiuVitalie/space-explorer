import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPODByDate } from '../../services/nasaApodApi';
import { APODDataI } from '../../shared/apod.interface';
import { motion } from 'framer-motion';
import DetailsModal from '../../components/DetailsModal/DetailsModal';
import styles from './DetailsPage.module.css';

const DetailsPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const [data, setData] = useState<APODDataI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      fetchAPODByDate(date)
        .then((response: APODDataI) => {
          setData(response);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err.message || 'Error while fetching data');
          setLoading(false);
        });
    }
  }, [date]);

  const handlePhotoClick = (url: string) => {
    setSelectedPhoto(url);
    document.body.style.overflow = "hidden"; // Отключаем прокрутку страницы при открытии модального окна
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "auto"; // Включаем прокрутку страницы при закрытии модального окна
  };

  if (loading) {
    return <p className={styles.message}>Fetching...</p>;
  }

  if (error) {
    return <p className={styles.message}>Error: {error}</p>;
  }

  if (!data) {
    return <p className={styles.message}>Data Unavailable</p>;
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.card}>
        <img src={data.url} alt={data.title} className={styles.image} onClick={() => handlePhotoClick(data.url)} />
        <div className={styles.cardContent}>
          <h1>{data.title}</h1>
          <p>{data.date}</p>
          <p>{data.explanation}</p>
        </div>
      </div>
      {selectedPhoto && (
        <DetailsModal selectedPhoto={selectedPhoto} handleCloseModal={handleCloseModal} />
      )}
    </motion.div>
  );
};

export default DetailsPage;