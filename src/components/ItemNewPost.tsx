import React from "react";
import { formatDateToDesc } from "../ultils/function-helper";

interface IProps {
  imgUrl: string;
  title: string;
  price: string;
  createdAt: string;
}
const ItemNewPost: React.FC<IProps> = ({ createdAt, price, imgUrl, title }) => {
  return (
    <div className="flex mb-4 border-b border-gray-400">
        <img
          className="h-[70px] w-[70px]"
          src={imgUrl}
          alt=""
        />
      <div className="mb-2 ml-2">
        <p className="text-sm text-[#055699] cursor-pointer">
          {title}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-semibold text-[#16c784]">
           {price}
          </span>
          <span className="text-sm text-gray-400">{formatDateToDesc(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemNewPost;
