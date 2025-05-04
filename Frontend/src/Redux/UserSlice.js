import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  checkedAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.checkedAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setCheckedAuth: (state) => {
      state.checkedAuth = true;
    }
  },
});

export const { loginSuccess, logout,setCheckedAuth } = userSlice.actions;
export default userSlice.reducer;
