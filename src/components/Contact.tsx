import React from "react";
import { textContact } from "../ultils/dataContact";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-start w-4/5 pt-10 pb-10 mt-4 mb-8 bg-white border border-blue-600 border-dashed rounded-md shadow-md border-3 border-spacing-3 pl-14 pr-14 lg:w-4/5">
      <img
        src={textContact.image}
        className="object-contain w-full h-48 mb-2"
        alt=""
      />
      <span className="m-4 text-[#233762]">{textContact.title}</span>
      <div className="flex items-center justify-around w-full">
        {textContact.supports.map((item, index) => (
          <div className="flex flex-col items-center" key={index}>
            <span className="mb-2 text-sm font-bold text-orange-500">
              {item.name.toUpperCase()}
            </span>
            <a className="mb-1 text-xl font-bold text-[#233762]" href={`tel: ${item.phone}`}>
              Điện thoại: {item.phone}
            </a>
            <a className="text-xl font-bold  text-[#233762]" href={`https://zalo.me/${item.zalo}`} >
              Zalo: {item.zalo}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
