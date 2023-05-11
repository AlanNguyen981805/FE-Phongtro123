import axiosConfig from "../axiosConfig";
import { IFormAuth } from "../types/auth";
import { CONST_API } from "./const";

export const apiRegister = (payload: IFormAuth) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "Post",
        url: `${CONST_API.AUTH.REGISTER}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiLogin = (payload: Pick<IFormAuth, "password" | "phone">) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "Post",
        url: `${CONST_API.AUTH.LOGIN}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
