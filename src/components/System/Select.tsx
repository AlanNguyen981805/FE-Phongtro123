import React, { FC } from "react";
import { ISelect } from "../../types/base";
import { IFormPost } from "../../types/post";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
  options: ISelect[] | null;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  registerField?: UseFormRegisterReturn<keyof IFormPost>;
  error?: any;
}
const Select: FC<IProps> = ({
  label,
  options,
  name,
  registerField,
  error
}) => {
  return (
    <div className="flex flex-col flex-1 gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <select
        className="w-full p-2 text-sm border border-gray-300 rounded-md outline-none cursor-pointer"
        // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        //   onChange && onChange(e);
        //   setPayload((prev) => ({
        //     ...prev,
        //     [name]: e.target.value,
        //   }));
        // }}
        {...registerField}
      >
        <option className="text-center" value={""}>-- Vui lòng chọn --</option>
        {options &&
          options.length > 0 &&
          options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
      <p className="text-sm text-red-400">{error?.message}</p>
    </div>
  );
};

export default Select;
