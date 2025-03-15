export interface Favorite {
    id: string;
    title: string;
    url: string;
}

export interface FavoritesContextType {
    favorites: Favorite[];
    addFavorite: (favorite: Favorite) => void;
    removeFavorite: (id: string) => void;
}

export interface FavoriteProviderProps {
    children: React.ReactNode;
}