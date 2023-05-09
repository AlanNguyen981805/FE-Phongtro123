import React, { memo } from "react";
import { useSearchParams } from "react-router-dom";

interface IProps {
  number?: number | string;
  currentPage?: number;
  type?: "end";
  icon?: string;
  setCurrentPage?: any
}

const notActive =
  "px-[18px] py-[15px] bg-white hover:bg-gray-300 hover:text-white rounded-md cursor-pointer";
const active =
  "px-[18px] py-[15px] bg-[#E13427] text-white hover:bg-gray-300 hover:text-white rounded-md cursor-pointer";

const PageNumber: React.FC<IProps> = ({ number,type, currentPage, icon, setCurrentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePage = () => {
    type === "end" ? setCurrentPage(currentPage) : setCurrentPage(number)
    setCurrentPage(number)
    if(!number) return
    searchParams.set('page', number?.toString())
    setSearchParams(searchParams)
  };

  return (
    <div
      className={number && number === currentPage ? active : notActive}
      onClick={handleChangePage}
    >
      {icon || number}
    </div>
  );
};

export default memo(PageNumber);
