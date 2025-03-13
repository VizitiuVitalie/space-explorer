import React, { useState, useEffect } from "react";
import { fetchAPOD } from "../../services/nasaApodApi";
import { APODDataI } from "../../shared/apod.interface";
import APODCard from "../../components/ApodCard/APODCard";
import { motion } from "framer-motion";
import styles from "./APODPage.module.css";

const APODPage: React.FC = () => {
  const [apodData, setApodData] = useState<APODDataI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAPOD = async () => {
      try {
        const response = await fetchAPOD();
        setApodData(response);
      } catch (err) {
        setError("Error while fetching data from NASA API");
      } finally {
        setLoading(false);
      }
    };

    loadAPOD();
  }, []);

  if (loading) return <p className={styles.message}>Fetching...</p>;
  if (error) return <p className={styles.message}>{error}</p>;
  if (!apodData) return null;

  return (
    <motion.div
      className={styles.apodPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>Astronomy Picture of the Day</h1>
      <APODCard data={apodData} />
    </motion.div>
  );
};

export default APODPage;