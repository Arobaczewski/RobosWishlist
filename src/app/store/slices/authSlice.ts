import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Address {
  street: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt?: string;
  address?: Address;
}

interface StoredUser extends User {
  password: string; // demo-only, plain text
}

interface AuthState {
  user: User | null;
  token: string | null; // kept for compatibility, but demo only
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface UpdateProfilePayload {
  userId: string;
  updates: Partial<Pick<User, "name" | "phone" | "email" | "address">>;
}

interface UpdatePasswordPayload {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

const USERS_KEY = "demo_users";
const AUTH_USER_KEY = "demo_auth_user";
const AUTH_TOKEN_KEY = "demo_auth_token";

const isBrowser = typeof window !== "undefined";

function loadStoredUsers(): StoredUser[] {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore for demo
  }
}

function loadInitialAuthState(): AuthState {
  if (!isBrowser) {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }

  try {
    const userRaw = window.localStorage.getItem(AUTH_USER_KEY);
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

    const user = userRaw ? (JSON.parse(userRaw) as User) : null;
    return {
      user,
      token,
      isAuthenticated: !!user && !!token,
      loading: false,
      error: null,
    };
  } catch {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }
}

const initialState: AuthState = loadInitialAuthState();

// ---------- Demo-mode thunks (no real backend) ----------

export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string; name: string },
  { rejectValue: string }
>("auth/registerUser", async ({ email, password, name }, { rejectWithValue }) => {
  const users = loadStoredUsers();
  const existing = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    return rejectWithValue("An account with this email already exists.");
  }

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Date.now().toString();

  const newUser: StoredUser = {
    id,
    email: email.toLowerCase(),
    name,
    password, // demo only
    createdAt: new Date().toISOString(),
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
  };

  const updatedUsers = [...users, newUser];
  saveStoredUsers(updatedUsers);

  const token = `demo-token-${newUser.id}`;

  const { password: _pw, ...publicUser } = newUser;

  if (isBrowser) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(publicUser));
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  return { user: publicUser, token };
});

export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  const users = loadStoredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user || user.password !== password) {
    return rejectWithValue("Invalid email or password.");
  }

  const token = `demo-token-${user.id}`;
  const { password: _pw, ...publicUser } = user;

  if (isBrowser) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(publicUser));
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  return { user: publicUser, token };
});
export const updateUserProfile = createAsyncThunk<
  { user: User },
  UpdateProfilePayload,
  { rejectValue: string }
>("auth/updateUserProfile", async ({ userId, updates }, { rejectWithValue }) => {
  const users = loadStoredUsers();
  const idx = users.findIndex((u) => u.id === userId);

  if (idx === -1) {
    return rejectWithValue("User not found.");
  }

  // If updating email, check uniqueness
  if (updates.email) {
    const emailExists = users.some(
      (u, i) =>
        i !== idx &&
        u.email.toLowerCase() === updates.email!.toLowerCase()
    );
    if (emailExists) {
      return rejectWithValue("Another account already uses that email.");
    }
  }

  const updatedStoredUser: StoredUser = {
    ...users[idx],
    ...updates,
  };

  users[idx] = updatedStoredUser;
  saveStoredUsers(users);

  const { password: _pw, ...publicUser } = updatedStoredUser;

  if (isBrowser) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(publicUser));
  }

  return { user: publicUser };
});

export const updateUserPassword = createAsyncThunk<
  void,
  UpdatePasswordPayload,
  { rejectValue: string }
>(
  "auth/updateUserPassword",
  async ({ userId, currentPassword, newPassword }, { rejectWithValue }) => {
    const users = loadStoredUsers();
    const idx = users.findIndex((u) => u.id === userId);

    if (idx === -1) {
      return rejectWithValue("User not found.");
    }

    const user = users[idx];

    // demo mode: plain text; later you’ll do proper hashing on the server
    if (user.password !== currentPassword) {
      return rejectWithValue("Current password is incorrect.");
    }

    if (!newPassword || newPassword.length < 6) {
      return rejectWithValue("New password must be at least 6 characters.");
    }

    const updatedStoredUser: StoredUser = {
      ...user,
      password: newPassword,
    };

    users[idx] = updatedStoredUser;
    saveStoredUsers(users);

    // No need to touch AUTH_USER_KEY – we don't store password there
  }
);


// ---------- Slice ----------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User | null; token?: string | null }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token ?? state.token;
      state.isAuthenticated = !!action.payload.user;

      if (isBrowser) {
        if (action.payload.user) {
          window.localStorage.setItem(
            AUTH_USER_KEY,
            JSON.stringify(action.payload.user)
          );
          if (action.payload.token) {
            window.localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token);
          }
        } else {
          window.localStorage.removeItem(AUTH_USER_KEY);
          window.localStorage.removeItem(AUTH_TOKEN_KEY);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (isBrowser) {
        window.localStorage.removeItem(AUTH_USER_KEY);
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Registration failed.";
    })
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Login failed.";
    })
    // 🔽 NEW: profile update
    .addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
    })
    .addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to update profile.";
    })
    // 🔽 NEW: password update
    .addCase(updateUserPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserPassword.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(updateUserPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to update password.";
    });
}
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
