import axiosConfig from "../axiosConfig";
import { IFormUser } from "../types/user";
import { CONST_API } from "./const";

export const apiGetCurrentUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "GET",
        url: `${CONST_API.USER.CURRENT_USER}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateUser = (data: IFormUser) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "POST",
        url: `${CONST_API.USER.UPDATE}`,
        data: { payload: data },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
