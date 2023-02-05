import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { URL } from "../../constants";
import { AuthToken, LoginResponse, ServerResponse } from "../../types";
import { authActions } from "./auth-slice";

export const login = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const loginRequest = async () => {
      const response = await axios.post(URL + `/auth/login`, {
        email: email,
        password: password,
      });

      const serverResponse = response.data as ServerResponse;
      const responsePayload = serverResponse.payload;
      const loginResponse = responsePayload.records[0] as LoginResponse;
      return {
        id: loginResponse.userId.toString(),
        accessToken: loginResponse.accessToken,
      } as AuthToken;
    };

    const authToken = await loginRequest();
    dispatch(
      authActions.replaceAuthUser({
        authToken: authToken,
      })
    );
    localStorage.setItem(
      "token",
      authToken.accessToken ? authToken.accessToken : ""
    );
    localStorage.setItem("id", authToken.id ? authToken.id : "");
  };
};
