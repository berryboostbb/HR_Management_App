import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  refreshToken: null,
  user: null,
  isLoggedIn: false,
  location: { latitude: null, longitude: null },
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
      Object.assign(state, initialState); // sab reset ho jaye
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setToken, setRefreshToken, setUser, setIsLoggedIn, logout,setLocation } =
  userSlice.actions;

export default userSlice.reducer;
