import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuthenticated: false,
    userId: "",
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;

      state.isAuthenticated = true;
      AsyncStorage.setItem("token", state.token);
      AsyncStorage.setItem("userId", state.userId);
    },
    logout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("userId");
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const logout = authSlice.actions.logout;

export default authSlice.reducer;
