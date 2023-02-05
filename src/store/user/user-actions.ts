import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { URL } from "../../constants";
import { ServerResponse, User } from "../../types";
import { usersActions } from "./users-slice";

export const getUser = (
  userId: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const getData = async () => {
      // console.log(localStorage.getItem("token"));
      const headers = {
        Authorization: localStorage.getItem("token") || "",
      };
      const response = await axios.get(`${URL}/api/users/${userId}`, {
        headers: headers,
      });

      const serverResponse = response.data as ServerResponse;
      const responsePayload = serverResponse.payload.records[0] as User;
      return responsePayload;
    };

    const userResp = await getData();
    console.log(userResp);
    if (userResp.id) dispatch(usersActions.getUser({ user: userResp }));
  };
};
