export const DOMAIN = {
  CATEGORY: "category",
  AREA: "area",
  PRICE: "price",
  AUTH: "auth",
  POST: "post",
  USER: "user",
};

export const CONST_API = {
  CATEGORY: {
    GET_ALL: `${DOMAIN.CATEGORY}/get-all`,
  },
  AREA: {
    GET_ALL: `${DOMAIN.AREA}/get-all`,
  },
  PRICE: {
    GET_ALL: `${DOMAIN.PRICE}/get-all`,
  },
  AUTH: {
    REGISTER: `${DOMAIN.AUTH}/register`,
    LOGIN: `${DOMAIN.AUTH}/login`,
  },
  POST: {
    GET_ALL: `${DOMAIN.POST}/get-all`,
    DETAIL: `${DOMAIN.POST}/`,
    LIMIT: `${DOMAIN.POST}/limit`,
    NEW_POSTS: `${DOMAIN.POST}/new-post`,
    LIMIT_ADMIN: `${DOMAIN.POST}/limit-admin`,
    CREATE: `${DOMAIN.POST}/create-post`,
    DELETE: `/delete-post`,
  },
  USER: {
    CURRENT_USER: `${DOMAIN.USER}/get-current-user`,
    UPDATE: `${DOMAIN.USER}/update`,
  },
};
