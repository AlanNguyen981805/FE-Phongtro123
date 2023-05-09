import React from "react";
import { IFormPost } from "../../types/post";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  label: string;
  value?: string;
  readonly?: boolean;
  error?: any;
  registerField?: UseFormRegisterReturn<keyof IFormPost>;
}

const TextArea: React.FC<IProps> = ({
  label,
  readonly,
  value,
  registerField,
  error
}) => {

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium" htmlFor="exactly-address">
        {label}
      </label>
      <textarea
        {...registerField}
        value={value}
        id="exactly-address"
        readOnly={readonly ? true : false}
        className={`w-full p-2 text-sm ${
          readonly && "bg-gray-100"
        } border border-gray-200 rounded-md outline-none`}
      />
       <p className="text-sm text-red-400">{error?.message}</p>
    </div>
  );
};

export default TextArea;
