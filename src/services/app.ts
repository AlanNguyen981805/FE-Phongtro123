import axiosConfig from "../axiosConfig";
import { CONST_API } from "./const";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "get",
        url: `${CONST_API.CATEGORY.GET_ALL}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetAreas = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "get",
        url: `${CONST_API.AREA.GET_ALL}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "get",
        url: `${CONST_API.PRICE.GET_ALL}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

