import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthToken, AuthTokenInitialState } from "../../types";

const initialState: AuthTokenInitialState = {
  authToken: {
    id: localStorage.getItem("id"),
    accessToken: localStorage.getItem("token"),
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    replaceAuthUser(state, action: PayloadAction<{ authToken: AuthToken }>) {
      const authUser = action.payload.authToken;
      if (authUser) {
        state.authToken = authUser;
      }
    },
  },
});

const authActions = authSlice.actions;

export { authSlice, authActions };
