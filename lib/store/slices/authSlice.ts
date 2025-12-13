import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthUser, UserProfile } from "../../types/user";

const initialState: AuthState = {
  user: null,
  userProfile: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUserProfile(state: AuthState, action: PayloadAction<UserProfile | null>) {
      state.userProfile = action.payload;
    },
    setLoading(state: AuthState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state: AuthState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearUser(state: AuthState) {
      state.user = null;
      state.userProfile = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, setUserProfile, setLoading, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;

