import axiosConfig from "../axiosConfig";
import { IFormUser } from "../types/user";

export const apiGetCurrentUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "GET",
        url: "/api/v1/user/get-current-user",
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
        url: "/api/v1/user/update",
        data: { payload: data },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
