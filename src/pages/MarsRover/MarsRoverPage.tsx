import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchMarsRoverPhotos,
  fetchMaxSol,
  MarsRoverPhoto,
} from "../../services/nasaMarsRoverApi";
import styles from "./MarsRoverPage.module.css";
import MarsRoverModal from "../../components/MarsRoverModal/MarsRoverModal";

const curiosityCameras = [
  "fhaz",
  "rhaz",
  "mast",
  "chemcam",
  "mahli",
  "mardi",
  "navcam",
];

const MarsRoverPage: React.FC = () => {
  const rover = "curiosity";
  const [searchMode, setSearchMode] = useState<"sol" | "earth">("sol");
  const [sol, setSol] = useState<number>(1000);
  const [maxSol, setMaxSol] = useState<number>(1000);
  const [earthDate, setEarthDate] = useState<string>("2015-06-03");
  const [maxEarthDate, setMaxEarthDate] = useState<string>("2025-03-13");
  const [minEarthDate, setMinEarthDate] = useState<string>("2011-11-26");
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [photos, setPhotos] = useState<MarsRoverPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MarsRoverPhoto | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  // Функция для загрузки фотографий в зависимости от режима поиска
  const handleFetchPhotos = async (reset: boolean = false) => {
    if (reset) {
      setPage(1);
      setPhotos([]);
      setHasMore(true);
    }

    setLoading(true);
    setError(null);

    try {
      const searchValue = searchMode === "sol" ? sol : earthDate;
      const data = await fetchMarsRoverPhotos(
        rover,
        searchValue,
        searchMode,
        selectedCamera || undefined,
        reset ? 1 : page
      );

      console.log("Fetched photos data:", data);

      if (!data || data.length === 0) {
        setHasMore(false);
        if (reset) setError("No photos found for this selection.");
        return;
      }

      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error: any) {
      setError(
        error.message ||
          "Something went wrong while fetching photos."
      );
    } finally {
      setLoading(false);
    }
  };

  // Если режим поиска по sol, получаем maxSol из манифеста ровера
  useEffect(() => {
    if (searchMode === "sol") {
      const fetchMaxSolData = async () => {
        try {
          const maxSol = await fetchMaxSol(rover);
          setMaxSol(maxSol);
        } catch (error) {
          console.error("Error fetching max sol:", error);
          setMaxSol(1000);
        }
      };

      fetchMaxSolData();
    }
  }, [rover, searchMode]);

  const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.startsWith("0") && value.length > 1) {
      value = value.substring(1);
    }
    let numberValue = Number(value);
    if (isNaN(numberValue)) return;
    if (numberValue < 0) numberValue = 0;
    if (numberValue > maxSol) numberValue = maxSol;
    setSol(numberValue);
  };

  const handleEarthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const date = new Date(value);
    const maxDate = new Date(maxEarthDate);
    const minDate = new Date(minEarthDate);
    if (date > maxDate) {
      setEarthDate(maxEarthDate);
    } else if (date < minDate) {
      setEarthDate(minEarthDate);
    } else {
      setEarthDate(value);
    }
  };

  const handlePhotoClick = (photo: MarsRoverPhoto) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = "hidden"; // Отключаем прокрутку страницы при открытии модального окна
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "auto"; // Включаем прокрутку страницы при закрытии модального окна
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.marsRoverTitle}>Photos from rover Curiosity</h1>
      <div className={styles.filters}>
        <label>
          Search Mode:
          <select
            value={searchMode}
            onChange={(e) =>
              setSearchMode(e.target.value as "sol" | "earth")
            }
          >
            <option value="sol">Martian Sol</option>
            <option value="earth">Earth Date</option>
          </select>
        </label>
        {searchMode === "sol" ? (
          <>
            <label>
              Sol (day on Mars):
              <input type="number" value={sol} onChange={handleSolChange} />
            </label>
            <p>Max available Sol: {maxSol}</p>
          </>
        ) : (
          <label>
            Earth Date (DD.MM.YYYY):
            <input
              type="date"
              value={earthDate}
              onChange={handleEarthDateChange}
              min={minEarthDate}
              max={maxEarthDate}
            />
          </label>
        )}
        <label>
          Camera:
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            <option value="">All</option>
            {curiosityCameras.map((cam) => (
              <option key={cam} value={cam}>
                {cam.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => handleFetchPhotos(true)}>Search</button>
      </div>
      {loading && photos.length === 0 && <p>Fetching...</p>}
      {error && <p>Error: {error}</p>}
      {photos.length > 0 && (
        <InfiniteScroll
          dataLength={photos.length}
          next={() => handleFetchPhotos()}
          hasMore={hasMore}
          loader={loading && <h4>Loading...</h4>}
          endMessage={<p>No more photos to show</p>}
        >
          <div className={styles.photosGrid}>
            {photos.map((photo) => (
              <div key={photo.id} className={styles.photoCard} onClick={() => handlePhotoClick(photo)}>
                <img src={photo.img_src} alt={`Sol ${photo.sol}`} />
                <p>{photo.earth_date}</p>
                <p>{photo.camera.full_name}</p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
      {selectedPhoto && (
        <MarsRoverModal selectedPhoto={selectedPhoto} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default MarsRoverPage;