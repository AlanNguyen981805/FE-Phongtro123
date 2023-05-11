import React, { memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps{
  label?: string;
  value?: string;
  readonly?: boolean;
  name: string;
  threeDot?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registerField?: UseFormRegisterReturn<string>;
  error?: any;
  width?: string
}

const Input: React.FC<IProps> = ({
  name,
  label,
  readonly,
  value,
  threeDot,
  registerField,
  error,
  width
}) => {
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let newValue = e.target.value;

  //   //format số 10000 to 100.000
  //   if (
  //     threeDot &&
  //     newValue &&
  //     !new RegExp("^[0-9]+$").test(newValue.replaceAll(".", ""))
  //   )
  //     return;
  //   if (threeDot && newValue) {
  //     newValue = parseFloat(
  //       newValue.replace(/\./g, "").replace(",", ".")
  //     ).toLocaleString("vi-VN");
  //   }

  //   // setValueInput(newValue);
  //   // onChange && onChange(e);
  //   // if (disabledSetPayload) return;
  //   // setPayload((prev) => ({
  //   //   ...prev,
  //   //   [name]: newValue,
  //   // }));
  // };

  return (
    <div className={`flex flex-col ${width}`}>
      {label && (
        <label className="font-medium" htmlFor="exactly-address">
          {label}
        </label>
      )}
      <input
        name={name}
        {...registerField}
        // value={value}
        type={threeDot ? "text" : "input"}
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

export default memo(Input);
