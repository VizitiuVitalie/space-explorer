import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import APODPage from "./pages/APOD/APODPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import MarsRoverPage from "./pages/MarsRover/MarsRoverPage";
import DetailsPage from "./pages/Details/DetailsPage";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apod" element={<APODPage />} />
          <Route path="/details/:date" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/mars-rover" element={<MarsRoverPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;