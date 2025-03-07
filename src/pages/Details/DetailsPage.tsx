import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPOD } from '../../services/nasaApi';
import { APODDataI } from '../../shared/apod.interface';
import styles from './DetailsPage.module.css';



const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<APODDataI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchAPOD(id)
        .then((response: APODDataI) => {
          setData(response);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err.message || 'Error while fetching data');
          setLoading(false);
        });
    }
  }, [id]);

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
    <div className={styles.container}>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <img src={data.url} alt={data.title} className={styles.image} />
      <p>{data.explanation}</p>
    </div>
  );
};

export default DetailsPage;
