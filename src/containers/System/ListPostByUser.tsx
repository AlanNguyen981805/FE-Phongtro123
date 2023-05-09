import React, { useEffect, useState } from "react";
import { apiDeletePost, apiGetPostsAdmin } from "../../services";
import { IPost } from "../../types/post";
import { formatCurrency, formatDateTime } from "../../ultils/function-helper";
import { Button } from "../../components";
import Swal from "sweetalert2";

const ListPostByUser = () => {
  const [listPosts, setListPosts] = useState<IPost[] | null>(null);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      const res = await apiDeletePost(id);
      if (res) {
        Swal.fire("Thành công", "Xoá bài viết thành công", "success");
        getPostsByUser();
      }
    } catch (error) {
        Swal.fire("Thất bại", "Có lỗi xảy ra", "error");
    }
  };

  const getPostsByUser = async () => {
    try {
      const res: any = await apiGetPostsAdmin();
      console.log(res);
      if (res.data.response) {
        setListPosts(res.data?.response?.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getPostsByUser();
  }, []);
  
  return (
    <div>
      <h1>Quản lý tin đăng</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 text-sm border">Mã tin</th>
            <th className="p-2 text-sm border">Ảnh</th>
            <th className="p-2 text-sm border">Tiêu đề</th>
            <th className="p-2 text-sm border">Giá</th>
            <th className="p-2 text-sm border">Ngày bắt đầu</th>
            <th className="p-2 text-sm border">Ngày hết hạn</th>
            <th className="p-2 text-sm border">Hành động</th>
          </tr>
        </thead>
        <tbody className="border">
          {listPosts &&
            listPosts.length > 0 &&
            listPosts.map((item, index) => {
              return (
                <tr className="border">
                  <td className="p-2 border w-[50px] text-sm">
                    #{item.id?.split("-")[0]}
                  </td>
                  <td className="p-2 border">
                    <img
                      className="w-[100px] h-[100px]"
                      src={item.image.images.split(",")[0]}
                      alt=""
                    />
                  </td>
                  <td className="p-2 text-sm border">{item.title}</td>
                  <td className="p-2 text-center border">
                    <div className="flex items-baseline justify-center">
                      <p className="font-semibold text-[#16c784]">
                        {formatCurrency(item.price) + ""}{" "}
                      </p>
                      <span className="text-sm">đ</span>
                    </div>{" "}
                  </td>
                  <td className="p-2 text-sm border">
                    {formatDateTime(item.createdAt)}
                  </td>
                  <td className="p-2 text-sm border">
                    {formatDateTime(item.endDate)}
                  </td>
                  <td className="p-2 text-sm text-center border">
                    <Button
                      onClick={() => handleDelete(item.id)}
                      bgColor="bg-[#e74c3c]"
                      text="Xoá"
                      textColor="text-[#fff]"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ListPostByUser;
