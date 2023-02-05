import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserInitialState } from "../../types";

const initialState: UserInitialState = {
  currentUser: {
    id: localStorage.getItem("id"),
    name: "",
    email: "",
    password: "",
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    getUser(state, action: PayloadAction<{ user: User }>) {
      const user = action.payload.user;

      if (user) {
        state.currentUser = user;
      }
      // console.log(state.currentUser);
    },
  },
});

const usersActions = usersSlice.actions;

export { usersSlice, usersActions };
