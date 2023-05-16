import axiosConfig from "../axiosConfig";
import { PARAMS_SEARCH } from "../ultils/constanst";
import { CONST_API } from "./const";

export const apiGetPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "get",
        url: `${CONST_API.POST.GET_ALL}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetDetailPost = (id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "get",
        url: `${CONST_API.POST.DETAIL}` + id,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPostsLimit = (query?: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "get",
        url: `${CONST_API.POST.LIMIT}?${transformParamsToDtoPost(query)}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetNewPosts = (query?: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "get",
        url: `${CONST_API.POST.NEW_POSTS}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPostsAdmin = (query?: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "post",
        url: `${CONST_API.POST.LIMIT_ADMIN}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateNewPost = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "post",
        url: `${CONST_API.POST.CREATE}`,
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const apiDeletePost = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "delete",
        url: `${CONST_API.POST.DETAIL}${id}${CONST_API.POST.DELETE}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const transformParamsToDtoPost = (query?: string) => {
  if (!query) return "";
  let where = "";
  const splitQuery = query.split("&");
  splitQuery.map((item) => {
    const inner = item.split("=");
    // where += `&${[inner[0]]}=${inner[1]}`;
    if (inner[0] === PARAMS_SEARCH.CATEGORY) {
      where += `&${[inner[0]]}=${inner[1]}`;
    }
    if (inner[0] === PARAMS_SEARCH.ORDER) {
      where += `&${[inner[0]]}=${inner[1]}`;
    }
    if (inner[0] === PARAMS_SEARCH.AREA) {
      where += `&${[inner[0]]}=${inner[1]}`;
    }
    if (inner[0] === PARAMS_SEARCH.PRICE) {
      const splitNumber = inner[1].split("-");
      where += `&minPrice=${splitNumber[0]}`;
      where += `&maxPrice=${splitNumber[1]}`;
    }
    if (inner[0] === PARAMS_SEARCH.ACREAGE) {
      const splitNumber = inner[1].split("-");
      where += `&minAcreage=${splitNumber[0]}`;
      where += `&maxAcreage=${splitNumber[1]}`;
    }
  });

  return where;
};
