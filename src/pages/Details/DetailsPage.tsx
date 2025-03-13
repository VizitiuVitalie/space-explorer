import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPODByDate } from '../../services/nasaApodApi';
import { APODDataI } from '../../shared/apod.interface';
import { motion } from 'framer-motion';
import styles from './DetailsPage.module.css';

const DetailsPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const [data, setData] = useState<APODDataI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <img src={data.url} alt={data.title} className={styles.image} />
      <p>{data.explanation}</p>
    </motion.div>
  );
};

export default DetailsPage;