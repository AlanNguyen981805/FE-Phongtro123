import { AxiosResponse } from "axios";
import actionTypes from "./actionTypes";
import { apiGetCurrentUser, apiUpdateUser } from "../../services";
import { IFormUser } from "../../types/user";

export const getCurrentUser = (): any => async (dispatch: any) => {
  try {
    const response: AxiosResponse<any> =
      (await apiGetCurrentUser()) as AxiosResponse<any>;
    console.log(response.data);
    if (response.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        data: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGOUT,
      data: null,
    });
    dispatch({
      type: actionTypes.GET_CURRENT_USER,
      data: null,
    });
  }
};

export const updateUser = (data: IFormUser): any => async (dispatch: any) => {
  try {
    const response: AxiosResponse<any> =
      (await apiUpdateUser(data)) as AxiosResponse<any>;
    if (response.data?.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_USER,
        data: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.UPDATE_USER,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_USER,
      data: null,
    });
  }
};
