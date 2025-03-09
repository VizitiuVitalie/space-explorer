import React, { useState, useEffect } from "react";
import { fetchAPOD } from "../../services/nasaApodApi";
import { APODDataI } from "../../shared/apod.interface";
import APODCard from "../../components/ApodCard/APODCard";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
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

  if (loading) return <p>Fetching...</p>;
  if (error) return <p>{error}</p>;
  if (!apodData) return null;

  return (
    <div className={styles.homePage}>
      <h1>Astronomy Picture of the Day</h1>
      <APODCard data={apodData} />
    </div>
  );
};

export default HomePage;
