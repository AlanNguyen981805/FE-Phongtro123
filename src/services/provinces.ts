import axios, { AxiosResponse } from "axios";
import { ICity, IDistrict, IResponseProvince, IWard } from "../types/province";

export const apiGetCity = (): Promise<
  AxiosResponse<IResponseProvince<ICity[]>>
> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axios.get("https://vapi.vnappmob.com/api/province/");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetDisrict = (
  provinceId: string
): Promise<AxiosResponse<IResponseProvince<IDistrict[]>>> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axios.get(
        "https://vapi.vnappmob.com/api/province/district/" + provinceId
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetWards = (
  districtId: string
): Promise<AxiosResponse<IResponseProvince<IWard[]>>> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axios.get(
        "https://vapi.vnappmob.com/api/province/ward/" + districtId
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
