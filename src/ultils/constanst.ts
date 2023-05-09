import { TypeSearch } from "../types/base";
import icons from "./icons";
const { ImPencil2, MdOutlineLibraryBooks, BiUserPin, AiOutlineLogout , RiHeartLine} = icons;

export const path = {
  HOME: "/*",
  HOME__PAGE: ":page",
  DETAIL_POST: "chi-tiet/:slug",
  LOGIN: "login",
  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  NHA_CHO_THUE: "nha-cho-thue",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  SYSTEM: "/he-thong/",
  CREATE_POST: "tao-moi-bai-dang",
  LIST_POSTS_BY_USER: "quan-ly-bai-dang",
  EDIT_PROFILE: "sua-thong-tin-ca-nhan",
  CONTACT_US: "lien-he"
};

export const HomeText = {
  HOME_TITLE: "Kênh thông tin Phòng Trọ số 1 Việt Nam",
  HOME_DESC:
    "Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

export const Location = [
  {
    id: "hdm",
    name: "Phòng trọ Hồ Chí Minh",
    image: "https://phongtro123.com/images/location_hcm.jpg",
  },
  {
    id: "hn",
    name: "Phòng trọ Hà Nội",
    image: "https://phongtro123.com/images/location_hn.jpg",
  },
  {
    id: "dn",
    name: "Phòng trọ Đà Nẵng ",
    image: "https://phongtro123.com/images/location_dn.jpg",
  },
];

export const TYPE_SEARCH: Record<TypeSearch, TypeSearch> = {
  CATEGORY: "CATEGORY",
  AREA: "AREA",
  PRICE: "PRICE",
  ACREAGE: "ACREAGE",
};

export const PARAMS_SEARCH = {
  AREA: "area",
  PRICE: "price",
  CATEGORY: "categoryCode",
  ACREAGE: "acreage",
};

export const MENU_DROPDOWN = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: ImPencil2,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: MdOutlineLibraryBooks,
  },
  {
    id: 4,
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: BiUserPin,
  },
  {
    id: 6,
    text: "Liên hệ",
    path: "/he-thong/lien-he",
    icon: BiUserPin,
  },
  {
    id: 7,
    text: "Tin đã lưu",
    path: "/he-thong/tin-da-luu",
    icon: RiHeartLine,
  },
  {
    id: 5,
    text: "Thoát",
    path: "/logout",
    icon: AiOutlineLogout,
  },
];


export const GENDER = [
  {
    label: 'Nam',
    value: "1"
  },
  {
    label: 'Nữ',
    value: "2"
  },
]