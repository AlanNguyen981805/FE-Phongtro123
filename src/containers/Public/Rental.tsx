import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { ItemSidebar, RelatePosts, Province } from "../../components";
import { RootStore } from "../../types/base";
import { ListPost, Pagination, Search } from "./index";
import { useEffect, useState } from "react";
import { toSlug } from "../../ultils/function-helper";
import { ICategory } from "../../types/cate";
import { PARAMS_SEARCH } from "../../ultils/constanst";

const Rental = () => {
  const [params, setParams] = useSearchParams();
  const { categories, acreages, prices } = useSelector(
    (state: RootStore) => state.app
  );
  const location = useLocation();
  const [category, setCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    const categoryByPage = categories.find(
      (item) => toSlug(item.value) === location.pathname.replace("/", "")
    );
    if (categoryByPage) {
      setCategory(categoryByPage);
      params.set('categoryCode', categoryByPage.code)
      setParams(params)
    }
  }, [location.pathname, categories]);

  return (
    <div className="flex flex-col w-full gap-3 ">
      <Search />
      <div>
        <h1 className="text-[28px] font-bold text-gray-700 cursor-pointer">
          {category?.header}
        </h1>
        <p className="text-sm text-gray-500">{category?.subHeader}</p>
      </div>
      <Province />
      <div className="flex w-full gap-4">
        <div className="w-[70%]">
          {category && <ListPost category={category} page={Number(params.get("page"))} />}
          <Pagination page={Number(params.get("page")) || 1} />
        </div>
        <div className="w-[30%]  flex  flex-col gap-4 justify-start items-center">
          <ItemSidebar
            isTwoColumn
            content={prices}
            typeParamSearch={PARAMS_SEARCH.PRICE}
            title="Xem theo giá"
          />
          <ItemSidebar
            isTwoColumn
            content={acreages}
            typeParamSearch={PARAMS_SEARCH.AREA}
            title="Xem theo diện tích"
          />

          <RelatePosts />
        </div>
      </div>
    </div>
  );
};

export default Rental;
