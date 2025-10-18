import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    email: string;
    name: string;
    favorites: string[];
}

interface AuthState { 
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false  
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            if(typeof window !== 'undefined'){
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            if(typeof window !== 'undefined'){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;