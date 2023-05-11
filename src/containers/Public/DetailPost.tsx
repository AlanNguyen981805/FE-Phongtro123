import { useEffect, useState } from "react";
import { Map, RelatePosts, Slider } from "../../components";
import icons from "../../ultils/icons";
import { Link, useParams } from "react-router-dom";
import { apiGetDetailPost } from "../../services";
import { IPost } from "../../types/post";
import { formatCurrency } from "../../ultils/function-helper";
import { formatDateToDesc } from "../../ultils/function-helper";

const {
  HiOutlineLocationMarker,
  ImPriceTags,
  BiCrop,
  BiTime,
  GrStar,
  BiPhone,
  RiHeartFill,
} = icons;

const DetailPost = () => {
  const [detailPost, setDetailPost] = useState<IPost | null>(null);
  let { slug } = useParams();

  const getDetailPost = async () => {
    if (!slug) return;
    try {
      const res: any = await apiGetDetailPost(slug?.toString());
      if (res) {
        setDetailPost(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDetailPost();
  }, [slug]);

  return (
    <div className="flex w-full">
      <div className="w-4/6 ">
        {detailPost?.image && <Slider images={detailPost?.image.images} />}
        {detailPost?.id && (
          <Link
            to={"/" + detailPost.id}
            className="font-semibold text-[#3763e0] text-2xl mb-2 cursor-pointer line2-ellipsis hover:underline"
          >
            {[...Array(Number(4))].map((star, index) => {
              return (
                <GrStar
                  size={24}
                  className="flex start-item-post"
                  color="#febb02"
                />
              );
            })}
            {detailPost?.title}
          </Link>
        )}
        <span className="flex items-center mb-2">
          <span className="mr-1">
            <HiOutlineLocationMarker />
          </span>
          Địa chỉ:{detailPost?.address}
        </span>
        <div className="flex items-center">
          <span className="flex items-center mr-6">
            <span className="mr-1">
              <ImPriceTags />
            </span>
            <span className="text-xl font-bold text-[#16c784]">
              {detailPost?.price &&
                formatCurrency(detailPost?.price.toString())}
              / Tháng
            </span>
          </span>
          <span className="flex items-center mr-6">
            <span className="mr-1">
              <BiCrop />
            </span>
            <span className="text-sm">{detailPost?.acreage}m²</span>
          </span>
          <span className="flex items-center mr-6">
            <span className="mr-1">
              <BiTime />
            </span>
            <span className="text-sm">
              {detailPost?.createdAt && formatDateToDesc(detailPost?.createdAt)}
            </span>
          </span>
          <span>
            <span className="mr-1">#</span>
            <span className="text-sm">123456</span>
          </span>
        </div>

        <h3 className="my-4 text-2xl font-semibold ">Thông tin mô tả</h3>
        <p>{detailPost?.description}</p>

        <h3 className="my-4 text-2xl font-semibold">Đặc điểm tin đăng</h3>
        <div>
          <div className="flex px-1 py-2 ">
            <span className="block w-1/4 text-sm">Mã tin:</span>
            <span className="text-sm">#1234456:</span>
          </div>
          <div className="flex px-1 py-2 bg-gray-200">
            <span className="block w-1/4 text-sm">Khu vực :</span>
            <span className="text-sm">Cho thuê nhà Hà Nội</span>
          </div>
          <div className="flex px-1 py-2 ">
            <span className="block w-1/4 text-sm">Loại tin rao :</span>
            <span className="text-sm">Thuê nhà nguyên căn</span>
          </div>
          <div className="flex px-1 py-2 bg-gray-200">
            <span className="block w-1/4 text-sm">Đối tượng thuê :</span>
            <span className="text-sm">Tất cả</span>
          </div>
          <div className="flex px-1 py-2 ">
            <span className="block w-1/4 text-sm">Ngày đăng :</span>
            <span className="text-sm">Chủ nhật, 14:20 15/2/2023</span>
          </div>
          <div className="flex px-1 py-2 bg-gray-200">
            <span className="block w-1/4 text-sm">Ngày hết hạn :</span>
            <span className="text-sm">Thứ 3 ngày 20/4/2023</span>
          </div>
        </div>
        <h3 className="my-4 text-2xl font-semibold">Thông tin liên hệ</h3>
        <div>
          <div className="flex px-1 py-2 ">
            <span className="block w-1/4 text-sm">Liên hệ:</span>
            <span className="text-sm">{detailPost?.user.name}</span>
          </div>
          <div className="flex px-1 py-2 bg-gray-200">
            <span className="block w-1/4 text-sm">Điện thoại:</span>
            <span className="text-sm">{detailPost?.user.phone}</span>
          </div>
          <div className="flex px-1 py-2 bg-gray-200">
            <span className="block w-1/4 text-sm">Zalo:</span>
            <span className="text-sm">{detailPost?.user.zalo}</span>
          </div>
        </div>

        <h3 className="my-4 text-2xl font-semibold">Bản đồ</h3>
        <span>
          Địa chỉ: 648 Ngô Quyền, Phường An Hải Bắc, Quận Sơn Trà, Đà Nẵng
        </span>

        <div className="h-[300px]">
          <Map />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/3 ">
        <div className="flex items-center justify-center bg-[#febb02] p-4 rounded-lg ">
          <div className="flex flex-col items-center justify-center w-full">
            <img
              className="rounded-full  w-[100px] h-[100px]"
              src="https://phongtro123.com/images/default-user.png"
              alt=""
            />
            <h4 className="mt-2 text-lg font-bold">{detailPost?.user.name}</h4>
            <p className="text-sm">
              <span>@</span>Đang hoạt động
            </p>
            <div className="flex items-center justify-center w-full   bg-[#16c784] py-2 rounded-md mt-2 cursor-pointer">
              <span className="mr-1">
                <BiPhone color="#fff" size={24} />
              </span>
              <a
                target="_blank"
                href={`tel:${detailPost?.user.phone}`}
                className="text-xl font-semibold text-white"
              >
                {detailPost?.user.phone}
              </a>
            </div>
            <div className="flex items-center justify-center w-full py-2 my-3 bg-white rounded-md cursor-pointer">
              <span>
                <BiPhone />
              </span>
              <a
                target="_blank"
                href={`https://zalo.me/${detailPost?.user.phone}`}
                className="ml-1 font-semibold"
              >
                Nhắn Zalo
              </a>
            </div>
            <div className="flex items-center justify-center w-full py-2 bg-white rounded-md">
              <span>
                <RiHeartFill />
              </span>
              <p className="ml-1 font-semibold"> Yêu thích</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <RelatePosts />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
