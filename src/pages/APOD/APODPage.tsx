import React, { useState, useEffect } from "react";
import { fetchAPOD, fetchAPODByDate } from "../../services/nasaApodApi";
import { APODDataI } from "../../shared/apod.interface";
import APODCard from "../../components/ApodCard/APODCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import { motion } from "framer-motion";
import styles from "./APODPage.module.css";

const APODPage: React.FC = () => {
  const [apodData, setApodData] = useState<APODDataI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAPOD = async (date?: string) => {
    try {
      const response = date ? await fetchAPODByDate(date) : await fetchAPOD();
      setApodData(response);
    } catch (err) {
      setError("Error while fetching data from NASA API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAPOD();
  }, []);

  const handleDateChange = (date: string) => {
    setLoading(true);
    setError(null);
    loadAPOD(date);
  };

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
      <h1 className={styles.apodTitle}>Astronomy Picture of the Day</h1>
      <DatePicker onDateChange={handleDateChange} />
      <APODCard data={apodData} />
    </motion.div>
  );
};

export default APODPage;