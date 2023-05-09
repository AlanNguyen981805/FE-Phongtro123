import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/System";
import { RootStore } from "../../types/base";
import { useForm } from "react-hook-form";
import { IFormUser } from "../../types/user";
import Swal from "sweetalert2";
import icons from "../../ultils/icons";
import { useEffect, useState } from "react";
import * as actions from "./../../store/actions";

const { BsCameraFill } = icons;

const EditProfile = () => {
  const { userData } = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();
  const [previewAvatar, setPreviewAvatar] = useState(userData?.avatar);
  const { register, handleSubmit, setValue } = useForm<IFormUser>({});

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    let files = e.target.files;
    console.log(files);
    // let images: string[] = [];
    if (!files) return;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME || ""
      );

      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data: any) => {
          setPreviewAvatar(data.url);
          setValue("avatar", data.url);
        });
    }
  };

  const onSubmit = async (data: IFormUser) => {
    try {
      const finalData = { ...data };
      delete finalData.id;
      await dispatch(actions.updateUser(finalData));
      Swal.fire("Thành công", "Sửa bài viết thành công", "success");
    } catch (error) {
      Swal.fire("Thất bại", "Có lỗi xảy ra" + error, "error");
    }
  };

  useEffect(() => {
    if (userData) {
      setValue("phone", userData?.phone);
      setValue("name", userData?.name);
      setValue("id", userData?.id);
      setValue("zalo", userData?.zalo);
      setValue("avatar", userData?.avatar);
      setValue("fbUrl", userData?.fbUrl);
      setPreviewAvatar(userData.avatar)
    }
  }, [userData]);

  return (
    <div>
      <h1 className="pb-2 mb-8 text-2xl font-semibold border-b">
        Cập nhập thông tin cá nhân
      </h1>
      <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center mb-4 ">
          <span className="w-1/4">Mã thành viên</span>
          <Input
            registerField={register("id")}
            name="id"
            readonly
            width="w-2/5"
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="w-1/4">Số điện thoại</span>
          <Input
            registerField={register("phone")}
            width="w-2/5"
            name="phone"
            readonly
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="w-1/4">Tên hiển thị</span>
          <Input registerField={register("name")} width="w-2/5" name="name" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="w-1/4">Email</span>
          <Input width="w-2/5" name="email" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="w-1/4">Số Zalo</span>
          <Input registerField={register("zalo")} width="w-2/5" name="zalo" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="w-1/4">Facebook</span>
          <Input
            registerField={register("fbUrl")}
            width="w-2/5"
            name="facebook"
          />
        </div>
        <div className="flex items-center justify-center">
          <span className="w-1/4">Mật khẩu</span>
          <div className="w-2/5">Đổi mật khẩu</div>
        </div>
        <div className="">
          <label
            htmlFor="file"
            className="w-full border-2 h-[200px] my-4  gap-4 flex flex-col items-center border-gray-400 border-dashed"
          >
            <BsCameraFill size={50} color="blue" />
            Them anh
          </label>
          <input
            {...register("avatar")}
            type="file"
            hidden
            id="file"
            onChange={handleFiles}
          />
          {previewAvatar && (
            <img
              src={previewAvatar}
              alt="preview"
              className="object-cover rounded-md w-[100px] h-[100px]"
            />
          )}
        </div>

        <div className="flex items-center justify-center">
          <input
            value="Cập nhập"
            type="submit"
            className="px-5 py-2 mt-3 text-white bg-blue-500 rounded-md cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
