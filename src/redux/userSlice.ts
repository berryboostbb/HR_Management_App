import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  refreshToken: null,
  user: null,
  isLoggedIn: false,
  location: { latitude: null, longitude: null },
  fcm_token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: state => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isLoggedIn = false;
      state.location = { latitude: null, longitude: null };
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setFCMToken: (state, action) => {
      state.fcm_token = action.payload;
    },
  },
});

export const {
  setToken,
  setRefreshToken,
  setUser,
  setIsLoggedIn,
  logout,
  setLocation,
  setFCMToken,
} = userSlice.actions;

export default userSlice.reducer;
