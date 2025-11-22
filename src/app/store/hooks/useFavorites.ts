"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  addFavorites,
  removeFavorites,
  setFavorites,
} from "../slices/favoritesSlice";

const isBrowser = typeof window !== "undefined";

// Helper: get the localStorage key for a given user
function getFavoritesKey(userId: string) {
  return `demo_favorites_${userId}`;
}

export function useFavorites() {
  const dispatch = useAppDispatch();
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // On mount / when user changes, load favorites from localStorage
  useEffect(() => {
    if (!isBrowser) return;

    if (!isAuthenticated || !user) {
      // Logged out → clear favorites in state
      dispatch(setFavorites([]));
      return;
    }

    try {
      const key = getFavoritesKey(user.id);
      const raw = window.localStorage.getItem(key);
      const stored = raw ? (JSON.parse(raw) as string[]) : [];
      dispatch(setFavorites(stored));
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
      dispatch(setFavorites([]));
    }
  }, [isAuthenticated, user?.id, dispatch]);

  const persistFavorites = (userId: string, items: string[]) => {
    if (!isBrowser) return;
    try {
      const key = getFavoritesKey(userId);
      window.localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  };

  const toggleFavorite = (productId: string) => {
    if (!isAuthenticated || !user) {
      alert("Please log in to save favorites.");
      return;
    }

    const isAlreadyFavorited = favorites.includes(productId);
    let updated: string[];

    if (isAlreadyFavorited) {
      dispatch(removeFavorites(productId));
      updated = favorites.filter((id) => id !== productId);
    } else {
      dispatch(addFavorites(productId));
      updated = [...favorites, productId];
    }

    persistFavorites(user.id, updated);
  };

  const isFavorited = (productId: string) => {
    return favorites.includes(productId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorited,
  };
}
