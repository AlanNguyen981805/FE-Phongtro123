import React, { FC, HTMLInputTypeAttribute } from "react";

interface IProps {
  label: string;
  value: string;
  nameInput: string;
  type?: HTMLInputTypeAttribute;
  setValue: (cb: (value: any) => any) => void;
  invalidFields: IFiledErrors[];
  setInvalidFields: any
}

interface IFiledErrors {
  name: string;
  message: string;
}

const InputForm: FC<IProps> = ({
  label,
  setValue,
  value,
  nameInput,
  type,
  invalidFields,
  setInvalidFields
}) => {
  return (
    <div>
      <label className="text-xs" htmlFor="">
        {label}
      </label>
      <input
        type={type || "text"}
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue((prev) => {
            return { ...prev, [nameInput]: e.target.value };
          })
        }
        onFocus={() => {
          console.log('heeree')
          setInvalidFields([])
        }}
      />
      {invalidFields?.length > 0 &&
        invalidFields?.some((item: IFiledErrors) => item.name === nameInput) && (
          <small className="italic text-red-500">
            {invalidFields.find((i: IFiledErrors) => i.name === nameInput)?.message}
          </small>
        )}
    </div>
  );
};

export default InputForm;
