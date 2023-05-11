import axios from "axios";

const PREFIX = "/api/v1/";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL + PREFIX,
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(
  function (config: any) {
    // Làm gì đó trước khi request dược gửi đi
    let token = window.localStorage.getItem("persist:auth");
    if (token) {
      const parseToken = JSON.parse(token?.toString())?.token.slice(1, -1);
      config.headers = {
        Authorization: parseToken !== "ul" ? `Bearer ${parseToken}` : null,
      };
    } else {
      config.headers = {
        Authorization: null,
      };
    }
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  }
);
export default instance;
