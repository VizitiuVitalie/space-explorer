import { FavoritesContextType } from "../context/FavoriteContext/types";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoriteContext/FavoriteProvider";

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
      throw new Error('useFavorites needs to be used within a FavoritesProvider');
    }
    return context;
  };