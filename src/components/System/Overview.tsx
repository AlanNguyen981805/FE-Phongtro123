import React from "react";
import { IFormPost } from "../../types/post";
import Input from "./Input";
import { TextArea, Select } from "./index";
import { useSelector } from "react-redux";
import { RootStore } from "../../types/base";
import { GENDER } from "../../ultils/constanst";
import { UseFormRegister } from "react-hook-form";

interface IProps {
  register: UseFormRegister<IFormPost>;
  errors: any;
}

const Overview: React.FC<IProps> = ({ register, errors }) => {
  const { categories } = useSelector((state: RootStore) => state.app);
  return (
    <>
      <div className="w-4/12 mt-2 mr-2">
        <Select
          registerField={register("category")}
          label="Loại chuyên mục"
          options={categories.map((item) => ({
            label: item.value,
            value: item.code,
          }))}
          name="category"
          error={errors.category}
        />
      </div>
      <div className="w-full mt-2 mr-2">
        <Input
          label="Tiêu đề"
          name="title"
          registerField={register("title")}
          error={errors?.title}
        />
      </div>
      <div className="w-full mt-2 mr-2">
        <TextArea
          registerField={register("desc")}
          label="Nội dung mô tả"
          error={errors.desc}
        />
      </div>
      <div className="w-full mt-2 mr-2">
        <Input
          readonly
          registerField={register("fullName")}
          label="Thông tin liên hệ"
          name="fullName"
        />
        <Input
          registerField={register("idUser")}
          readonly
          label="ID user"
          name="idUser"
        />
      </div>
      <div className="w-full mt-2 mr-2">
        <Input
          readonly
          registerField={register("phone")}
          label="Điện thoại"
          name="phone"
        />
      </div>
      <div className="w-full mt-2 mr-2">
        <Input
          registerField={register("price")}
          error={errors?.price}
          threeDot
          label="giá cho thuê"
          name="price"
        />
      </div>
      <div className="w-full mt-2 mr-2">
        <Input
          registerField={register("acreage")}
          error={errors?.acreage}
          threeDot
          label="Diện tích"
          name="acreage"
        />
      </div>
      <div className="w-4/12 mt-2 mr-2">
        <Select
          registerField={register("rental_obj")}
          label="Đối tượng cho thuê"
          options={GENDER}
          name="rental_obj"
          error={errors.rental_obj}
        />
      </div>
    </>
  );
};

export default Overview;
