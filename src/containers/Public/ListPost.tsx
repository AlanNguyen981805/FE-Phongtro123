import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ItemPost, Loading } from "../../components";
import { IPost } from "../../types/post";
import * as actions from "./../../store/actions";
import { ICategory } from "../../types/cate";
import { RootStore } from "../../types/base";
import { useSearchParams } from "react-router-dom";

interface IProps {
  page: number;
  category?: ICategory | null;
}

type ITypeOrder = "view" | "latest";

const ListPost: React.FC<IProps> = ({ page, category }) => {
  const dispatch = useDispatch();
  const url = new URLSearchParams(window.location.search);
  const [searchParams, setSearchParam] = useSearchParams();
  const order = searchParams.get("order");
  const [activeOrderSearch, setActiveOrderSearch] = useState<ITypeOrder | null>(
    null
  );
  const queryString = url.toString();
  const { listPost }: { listPost: IPost[]; count: number } = useSelector(
    (state: RootStore) => state.post
  );
  const listRef = useRef<HTMLDivElement>(null);

  const handleFilter = (type: ITypeOrder) => {
    searchParams.set("order", type);
    setSearchParam(searchParams);
  };

  const renderOrder = (type: ITypeOrder, title: string) => {
    return (
      <Button
        className={activeOrderSearch === type ? "underline" : ""}
        text={title}
        onClick={() => handleFilter(type)}
        bgColor="bg-gray-200"
      />
    );
  };

  useEffect(() => {
    dispatch(actions.getPostsLimit(queryString));
    listRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [dispatch, page, queryString, category]);

  useEffect(() => {
    if (!order) return;
    setActiveOrderSearch(order as ITypeOrder);
  }, [order]);

  return (
    <>
      <div ref={listRef} className="w-full p-2 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between my-3">
          <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
          <span>Cập nhập: 12:05 25/12/2023</span>
        </div>
        <div className="flex items-center gap-2 my-2">
          <span>Sắp xếp</span>
          {renderOrder("view", "Nổi bật")}
          {renderOrder("latest", "Mới nhất")}
        </div>
        <div className=" items">
          {listPost.length > 0 ? (
            listPost.map((item) => {
              return (
                <ItemPost
                  createdAt={item.createdAt}
                  description={item.description}
                  images={item.image.images.split(",")}
                  star={Number(item.star)}
                  title={item.title}
                  labelCode={item.labelCode}
                  postAttr={item.attr}
                  address={item.address}
                  infoUser={item.user}
                  totalImg={"4 ảnh"}
                  price={item.price}
                  acreage={item.acreage}
                  id={item.id}
                  view={item.view}
                />
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default ListPost;
