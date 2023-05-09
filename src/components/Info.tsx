import React from "react";
import { textInfo } from "../ultils/dataInfo";
import Button from "./Button";
import { GrStar } from "react-icons/gr";

const Info = () => {
  return (
    <div className="flex flex-col items-center justify-start w-4/5 pt-10 pb-10 bg-white rounded-md shadow-md pl-14 pr-14 lg:w-4/5">
      <h3 className="mb-3 text-xl font-semibold">{textInfo.title}</h3>
      <p className="mb-3 text-sm text-center text-gray-700">{textInfo.description}</p>
      <div className="flex justify-around w-full mb-3">
        {textInfo.statistic.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-xl font-bold">{item.value}</h3>
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
      <p className="mb-2 text-xl font-semibold text-gray-800">{textInfo.benefit}</p>
      <div className="mb-3">
      <GrStar size={24} className="start-item-post" color="#febb02" />
      <GrStar size={24} className="start-item-post" color="#febb02" />
      <GrStar size={24} className="start-item-post" color="#febb02" />
      <GrStar size={24} className="start-item-post" color="#febb02" />
      <GrStar size={24} className="start-item-post" color="#febb02" />
      </div>
      <p className="mb-3 text-sm italic text-center text-gray-600">"{textInfo.comment}"</p>
      <p className="mb-3 text-sm">{textInfo.author}</p>
      <h3 className="mb-3 text-lg font-semibold">{textInfo.question}</h3>
      <h3 className="mb-3 text-sm">{textInfo.answer}</h3>

      <Button bgColor="bg-secondary2" textColor="text-white"  text="Đăng tin ngay" />
    </div>
  );
};

export default Info;
