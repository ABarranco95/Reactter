import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "Angel",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state) => {
      state.userId = "James";
    },
    logOut: (state) => {
      state.userId = "";
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
