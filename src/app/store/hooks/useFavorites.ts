import { useAppDispatch, useAppSelector } from "./hooks";
import { addFavorites, removeFavorites, setFavorites } from "../slices/favoritesSlice";
import { useEffect } from "react";

export function useFavorites() {
    const dispatch = useAppDispatch();
    const { items: favorites } = useAppSelector((state) => state.favorites);
    const { token, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if(isAuthenticated && token) {
            fetchFavorites();
        }
    }, [isAuthenticated, token]);

    const fetchFavorites = async () => {
        if(!token) return;

        try {
            const response = await fetch('/api/favorites', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setFavorites(data.favorites));
            } 
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const toggleFavorite = async (productId: string) => {
        if (!token) {
            alert('Please log in to save favorites');
            return;
        }

        const isFavorited = favorites.includes(productId);

        try {
            if(isFavorited){
                const response = await fetch(`/api/favorites?productId=${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response.ok) {
                    dispatch(removeFavorites(productId));
                }
            
            } else {
                const response = await fetch('/api/favorites', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId })
                });

                if(response.ok){
                    dispatch(addFavorites(productId));
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            alert('Failed to update favorites');
        }
    };

    const isFavorited = (productId: string) => {
        return favorites.includes(productId);
    };

    return {
        favorites,
        toggleFavorite,
        isFavorited
    };
}