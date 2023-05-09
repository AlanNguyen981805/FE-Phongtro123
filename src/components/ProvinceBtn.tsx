import { FC, memo } from "react";

interface IProps {
  title: string;
  image: string;
}

const ProvinceBtn: FC<IProps> = ({ title, image }) => {
  return (
    <div className="text-blue-700 shadow-md cursor-pointer rounded-bl-md rounded-br-md hover:text-orange-600">
      <img
        src={image}
        alt={title}
        className="w-[190px] h-[110px] object-cover rounded-tr-md rounded-md"
      />
      <p className="py-2 font-medium text-center ">{title}</p>
    </div>
  );
};

export default memo(ProvinceBtn);
