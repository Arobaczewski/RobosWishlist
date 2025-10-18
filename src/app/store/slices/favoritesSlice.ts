import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
    items: string[];
    loading: boolean;
}

const initialState: FavoritesState = {
    items: [],
    loading: false
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<string[]>) => {
            state.items = action.payload;
        }, 
        addFavorites: (state, action: PayloadAction<string>) => {
            if(!state.items.includes(action.payload)) {
                state.items.push(action.payload);
            }
        },  
        removeFavorites: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(id => id !== action.payload);
        },
        clearFavorites: (state) => {
            state.items = [];
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

export const { setFavorites, addFavorites, removeFavorites, clearFavorites, setLoading } = favoritesSlice.actions;
export default favoritesSlice.reducer;