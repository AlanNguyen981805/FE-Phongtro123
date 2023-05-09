import axiosConfig from "../axiosConfig";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "get",
        url: "/api/v1/category/get-all",
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
        url: "/api/v1/area/get-all",
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
        url: "/api/v1/price/get-all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

