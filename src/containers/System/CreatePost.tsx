import React, { useEffect, useState } from "react";
import { Address, Overview } from "../../components/System";
import { IFormPost } from "../../types/post";
import icons from "../../ultils/icons";
import { Map } from "../../components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiCreateNewPost } from "../../services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constanst";
import { useSelector } from "react-redux";
import { RootStore } from "../../types/base";

const { BsCameraFill, ImBin } = icons;

const schema = yup
  .object<IFormPost>({
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    title: yup.string().required("Vui lòng nhập tiêu đề"),
    desc: yup.string().required("Vui lòng nhập mô tả"),
    price: yup.string().required("Vui lòng nhập giá"),
    acreage: yup.string().required("Vui lòng nhập diện tích"),
    district: yup.string().required("Vui lòng chọn quận huyện"),
    city: yup.string().required("Vui lòng chọn thành phố"),
    ward: yup.string().required("Vui lòng chọn phường xã"),
    category: yup.string().required("Vui lòng chọn chuyên mục"),
    rental_obj: yup.string().required("Vui lòng chọn chuyên mục"),
    media: yup.object().shape({
      myFile: yup.mixed().test("required", "Phải là tệp tin", (file) => {
        if (file) return true;
        return false;
      }),
    }),
  })
  .required()
  .shape({
    media: yup
      .mixed()
      .test("required", "Bạn chưa chọn ảnh", (value: any) => value.length > 0),
  });

const CreatePost = () => {
  const { userData } = useSelector((state: RootStore) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormPost>({
    resolver: yupResolver(schema),
  });
  const [imgPreview, setImgPreview] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    let files = e.target.files;
    let images: string[] = [];
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
          images = [...images, data.secure_url];
          setValue("media", images.join(","));
          setImgPreview((prev) => [...prev, data.secure_url]);
        });
    }
  };

  const onSubmit = async (data: IFormPost) => {
    const finalData = {
      media: data.media,
      city: {
        id: data.city,
        name: data.nameCity ?? "",
      },
      district: {
        id: data.district,
        name: data.nameDistrict ?? "",
      },
      ward: {
        id: data.ward,
        name: data.nameDistrict ?? "",
      },
      fullAddress: data.fullAddress,
      categoryCode: data.category,
      title: data.title,
      desc: data.desc,
      price: data.price,
      acreage: data.acreage,
      rentalObj: data.rental_obj,
      userId: data.idUser,
      view: "0",
      highlight: false,
      endDate: "2023-05-02T08:26:54.758Z",
      star: "3",
    };
    try {
      const response = await apiCreateNewPost(finalData);
      if (response) {
        Swal.fire("Thành công", "Tạo bài viết thành công", "success");
        navigate(path.SYSTEM + path.LIST_POSTS_BY_USER);
      }
    } catch (error) {
      Swal.fire("Thất bại", "Có lỗi xảy ra" + error, "error");
    }
  };

  useEffect(() => {
    if (!userData) return;
    setValue("fullName", userData?.name);
    setValue("phone", userData?.phone);
    setValue("idUser", userData?.id!);
  }, [userData]);

  return (
    <div>
      <h1 className="pb-4 text-3xl border-b ">Đăng tin mới</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full mt-6">
          <div className="w-2/3 w-full">
            <h3 className="text-xl font-bold ">Địa chỉ cho thuê</h3>
            <div className="w-full gap-2 ">
              <Address
                addressCuThe={address}
                setAddressCuThe={setAddress}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </div>

            <h3 className="mt-6 text-xl font-bold">Thông tin mô tả</h3>
            <div className="w-full gap-2 ">
              <Overview errors={errors} register={register} />
            </div>
            <div className="w-full">
              <label
                htmlFor="file"
                className="w-full border-2 h-[200px] my-4  gap-4 flex flex-col items-center border-gray-400 border-dashed"
              >
                <BsCameraFill size={50} color="blue" />
                Them anh
              </label>
              <input
                {...register("media")}
                type="file"
                hidden
                id="file"
                multiple
                onChange={handleFiles}
              />
              <p className="text-sm text-red-400">{errors?.media?.message}</p>
            </div>
            <div className="w-full">
              <h3 className="py-4 font-medium">Ảnh đã chọn</h3>
              <div className="flex items-center gap-4">
                {imgPreview &&
                  imgPreview?.map((item) => {
                    return (
                      <div key={item} className="relative w-1/3 h-1/3 ">
                        <img
                          src={item}
                          alt="preview"
                          className="object-cover w-full h-full rounded-md w-[150px] h-[150px]"
                        />
                        {/* <span
                          title="Xóa"
                          className="absolute top-0 right-0 p-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400"
                        >
                          <ImBin />
                        </span> */}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="w-1/3 ml-6">
            <Map address={""} />
            <div className="p-3 bg-[#fff3cd] border-[#ffeeba] border mt-4">
              <h1 className="text-xl font-semibold ">Lưu ý khi đăng tin</h1>
              <ul className="ml-4 text-sm list-square">
                <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
                <li>Tiêu đề tin không dài quá 100 kí tự</li>
                <li>
                  Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có
                  hiệu quả hơn.
                  <li>
                    Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn,
                    hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo
                    icon tới đúng vị trí của tin rao.
                  </li>
                  <li>
                    Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều
                    lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao
                    dịch nhanh chóng! Liên hệ với chúng tôi nếu bạn cần hỗ trợ:
                    HỖ TRỢ ĐĂNG TIN Điện thoại: 0902657123 Zalo: 0902657123 HỖ
                    TRỢ ĐĂNG TIN Điện thoại: 0901424123 Zalo: 0901424123 HỖ TRỢ
                    ĐĂNG TIN Điện thoại: 0981504039 Zalo: 0981504039 PHẢN
                    ÁNH/KHIẾU NẠI Điện thoại: 0917686101 Zalo: 0917686101 1
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <input
          type="submit"
          className="px-5 py-2 mt-3 text-white bg-blue-500 rounded-md cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreatePost;
