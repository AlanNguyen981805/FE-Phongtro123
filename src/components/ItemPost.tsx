import React, { FC, memo, useState } from "react";
import icons from "../ultils/icons";
import { IPost } from "../types/post";
import { formatCurrency, formatDateToDesc } from "../ultils/function-helper";
import { Link } from "react-router-dom";

interface IProps {
  images: string[];
  totalImg: string;
  labelCode: string;
  description: string;
  title: string;
  star: number;
  id?: string;
  address: string;
  createdAt: string;
  price: string;
  acreage: string;
  view: number;
  postAttr: IPost["attr"];
  infoUser: IPost["user"];
}

const { RiHeartFill, GrStar, BsBookmarkStarFill } = icons;

const ItemPost: FC<IProps> = ({
  id,
  description,
  images,
  labelCode,
  title,
  totalImg,
  star,
  postAttr,
  address,
  infoUser,
  price,
  acreage,
  createdAt,
  view,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="flex w-full py-4 border-t border-orange-600">
      <div className="flex flex-wrap w-2/5 gap-[2px] cursor-pointer items-center relative mr-2">
        {images.map((item) => {
          return (
            // <div>
            <img
              src={item}
              alt="preview"
              className="object-cover w-[49%] h-[120px]"
            />
            // </div>
          );
        })}
        <span className="absolute px-2 text-white rounded-md bg-overlay-30 left-1 bottom-1">
          4 ảnh
        </span>
        <span
          className="absolute text-white right-5 bottom-1"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {isHover ? (
            <RiHeartFill size={26} color={"red"} />
          ) : (
            <RiHeartFill size={26} />
          )}
        </span>
      </div>
      <div className="w-3/5">
        <div className="flex items-start justify-between w-full gap-4">
          <Link
            to={"chi-tiet/" + id}
            className="font-semibold text-red-600 cursor-pointer line2-ellipsis hover:underline"
          >
            {[...Array(Number(star))].map((star, index) => {
              return (
                <GrStar size={18} className="start-item-post" color="#febb02" />
              );
            })}
            {title.toUpperCase()}
          </Link>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color={"febb02"} />
          </div>
        </div>
        <div className="flex justify-end w-full text-xs text-gray-700">
          {postAttr.published}
        </div>
        <div className="flex items-center items-baseline justify-between my-2">
          <span className="font-bold text-green-600">
            <span></span>
            {formatCurrency(price)}/tháng
          </span>
          <span className="text-sm">{acreage}m²</span>
          <span className="text-sm truncate sm:w-72 md:w-52">{address}</span>
          <span className="text-sm text-gray-400">
            {formatDateToDesc(createdAt)}
          </span>
        </div>
        <p className="text-gray-500  multiline-ellipsis text-[14px]">
          {description}
        </p>
        <div className="flex items-center justify-between gap-1 my-5">
          <div className="flex items-center gap-2">
            <img
              src={
                infoUser.avatar
                  ? infoUser.avatar
                  : "https://static.wikia.nocookie.net/avatar/images/3/37/Amon%27s_scar.png/revision/latest?cb=20121107111159"
              }
              alt="avatart"
              className="w-[30px] h-[30px] rounded-full object-cover"
            />
            <p className="text-sm text-gray-500">{infoUser.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              className="p-1 text-sm text-white bg-blue-700 rounded-md"
              type="button"
              href={`tel:${infoUser.zalo}`}
            >
              Gọi {infoUser.phone}
            </a>
            {infoUser.zalo && (
              <a
                target="_blank"
                href={`https://zalo.me/${infoUser.zalo}`}
                className="p-1 px-2 text-sm border border-blue-700 rounded-md"
                type="button"
              >
                Nhắn Zalo
              </a>
            )}
          </div>
        </div>
        <p className="text-[12px] mb-[-11px] text-gray-400">
          Lượt xem: <span className="font-semibold">{view}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(ItemPost);
