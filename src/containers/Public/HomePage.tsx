import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ItemSidebar, RelatePosts, Province } from "../../components";
import { RootStore } from "../../types/base";
import { HomeText, PARAMS_SEARCH } from "../../ultils/constanst";
import { ListPost, Pagination, Search } from "./index";

const HomePage = () => {
  const [params] = useSearchParams();
  const { categories, acreages, prices } = useSelector(
    (state: RootStore) => state.app
  );
  return (
    <div className="flex flex-col w-full gap-3 ">
      <Search />
      <div>
        <h1 className="text-[28px] font-bold text-gray-700 cursor-pointer">
          {HomeText.HOME_TITLE}
        </h1>
        <p className="text-sm text-gray-500">{HomeText.HOME_DESC}</p>
      </div>
      <Province />
      <div className="flex w-full gap-4">
        <div className="w-[70%]">
          <ListPost page={Number(params.get("page"))} />
          <Pagination page={Number(params.get("page")) || 1} />
        </div>
        <div className="w-[30%]  flex  flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
          <ItemSidebar
            isTwoColumn
            content={prices}
            typeParamSearch={PARAMS_SEARCH.PRICE}
            title="Xem theo giá"
          />
          <ItemSidebar
            isTwoColumn
            content={acreages}
            typeParamSearch={PARAMS_SEARCH.ACREAGE}
            title="Xem theo diện tích"
          />

          <RelatePosts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
