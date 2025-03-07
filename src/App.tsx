// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import FavoritesPage from './pages/Favorites/FavoritesPage';
import DetailsPage from './pages/Details/DetailsPage';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/detail/:id" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
