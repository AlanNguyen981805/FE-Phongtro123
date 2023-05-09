export function toSlug(str: string) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, "");

  // return
  return str;
}

export function formatDateToDesc(inputTime: string) {
  // Chuỗi thời gian đầu vào

  // Chuyển chuỗi thời gian đầu vào thành đối tượng Date
  const time = new Date(inputTime);

  // Lấy thời gian hiện tại
  const currentTime = new Date();

  // Tính khoảng cách giữa hai thời điểm
  const diff = currentTime.getTime() - time.getTime();

  // Chuyển đổi khoảng cách thời gian thành một chuỗi mô tả tương đối
  let relativeTime;
  if (diff < 60 * 1000) {
    relativeTime = "vừa xong";
  } else if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    relativeTime = `${minutes} phút trước`;
  } else if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    relativeTime = `${hours} giờ trước`;
  } else {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    relativeTime = `${days} ngày trước`;
  }

  return relativeTime;
}

export const getNumbersPrice = (value: string) =>
  value
    .split(" ")
    .map((item) => +item)
    .filter((item) => !item === false);

export const getNumbersArea = (value: string) =>
  value
    .split(" ")
    .map((item: any) => +item.match(/\d+/))
    .filter((item) => item !== 0);

export const formatCurrency = (num: string) => {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};

export const formatDateTime = (dateTimeStr: string) => {
  const dateObj = new Date(dateTimeStr);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear().toString();
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
