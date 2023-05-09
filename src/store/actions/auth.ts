import { AxiosResponse } from "axios";
import { apiLogin, apiRegister } from "../../services/auth";
import { IFormAuth, IResponseRegister } from "../../types/auth";
import actionTypes from "./actionTypes";

export const register =
  (payload: IFormAuth): any =>
  async (dispatch: any) => {
    try {
      const response: AxiosResponse<IResponseRegister> = (await apiRegister(
        payload
      )) as AxiosResponse<IResponseRegister>;
      if (response.data?.err === 0) {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          data: response.data.token,
        });
      } else {
        dispatch({
          type: actionTypes.REGISTER_FAIL,
          data: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: null,
      });
    }
  };

export const login =
  (payload: Pick<IFormAuth, "phone" | "password">): any =>
  async (dispatch: any) => {
    try {
      const response: AxiosResponse<IResponseRegister> = (await apiLogin(
        payload
      )) as AxiosResponse<IResponseRegister>;
      if (response.data?.err === 0) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          data: response.data.token,
        });
      } else {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          data: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: null,
      });
    }
  };

export const logout = () => ({
  type: actionTypes.LOGOUT,
})