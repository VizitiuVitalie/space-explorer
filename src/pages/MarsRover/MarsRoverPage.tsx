import React, { useState, useEffect } from "react";
import {
  fetchMarsRoverPhotos,
  MarsRoverPhoto,
} from "../../services/nasaMarsRoverApi";
import { MARS_ROVER_BASE_URL, NASA_API_KEY } from "../../config/config";
import styles from "./MarsRoverPage.module.css";

const rovers = ["curiosity", "opportunity", "spirit"];
const camerasByRover: { [key: string]: string[] } = {
  curiosity: ["fhaz", "rhaz", "mast", "chemcam", "mahli", "mardi", "navcam"],
  opportunity: ["fhaz", "rhaz", "navcam", "pancam", "minites"],
  spirit: ["fhaz", "rhaz", "navcam", "pancam", "minites"],
};

const MarsRoverPage: React.FC = () => {
  const [selectedRover, setSelectedRover] = useState("curiosity");
  const [sol, setSol] = useState<number>(1000);
  const [maxSol, setMaxSol] = useState<number>(1000);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [photos, setPhotos] = useState<MarsRoverPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPhotos = async () => {
    setLoading(true);
    setError(null);
    setPhotos([]);

    try {
      const data = await fetchMarsRoverPhotos(
        selectedRover,
        sol,
        selectedCamera || undefined
      );

      console.log("Fetched photos data:", data);

      if (!data || data.length === 0) {
        setError("No photos found for this selection.");
        return;
      }

      setPhotos(data);
    } catch (error: any) {
      setError(
        error.message ||
          "Something went wrong while setting error for handleFetchPhotos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPhotos();
  }, [selectedRover, sol, selectedCamera]);

  useEffect(() => {
    const fetchMaxSol = async () => {
      try {
        const response = await fetch(
          `${MARS_ROVER_BASE_URL}/manifests/${selectedRover}?api_key=${NASA_API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch max sol");
        const data = await response.json();
        setMaxSol(data.photo_manifest.max_sol);
      } catch (error) {
        console.error("Error fetching max sol:", error);
        setMaxSol(1000);
      }
    };

    fetchMaxSol();
  }, [selectedRover]);

  const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Убираем ведущие нули
    if (value.startsWith("0") && value.length > 1) {
      value = value.substring(1);
    }

    let numberValue = Number(value);

    // Проверяем, чтобы значение было валидным числом
    if (isNaN(numberValue)) return;

    // Ограничиваем диапазон
    if (numberValue < 0) numberValue = 0;
    if (numberValue > maxSol) numberValue = maxSol;

    setSol(numberValue);
  };

  return (
    <div className={styles.container}>
      <h1>Mars Rover Photos</h1>
      <div className={styles.filters}>
        <label>
          Choose Rover:
          <select
            value={selectedRover}
            onChange={(e) => {
              setSelectedRover(e.target.value);
              setSelectedCamera("");
            }}
          >
            {rovers.map((rover) => (
              <option key={rover} value={rover}>
                {rover.charAt(0).toUpperCase() + rover.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sol (day on Mars):
          <input
            type="text" // Тип text, чтобы не было проблем с ведущими нулями
            value={sol}
            onChange={handleSolChange}
          />
        </label>
        <p>Max available Sol: {maxSol}</p>
        <label>
          Camera:
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            <option value="">All</option>
            {camerasByRover[selectedRover].map((cam) => (
              <option key={cam} value={cam}>
                {cam.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleFetchPhotos}>Find photo</button>
      </div>
      {loading && <p>Fetching...</p>}
      {error && <p>Error: {error}</p>}
      <div className={styles.photosGrid}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.photoCard}>
            <img src={photo.img_src} alt={`Sol ${photo.sol}`} />
            <p>{photo.earth_date}</p>
            <p>{photo.camera.full_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverPage;
