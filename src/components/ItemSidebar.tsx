import React, { memo } from "react";
import { ICategory, IPricesOrAcreages } from "../types/cate";
import icons from "../ultils/icons";
import { Link, useSearchParams } from "react-router-dom";
import { toSlug } from "../ultils/function-helper";
import { PARAMS_SEARCH } from "../ultils/constanst";

const { GrNext } = icons;
interface IProps {
  content?: IPricesOrAcreages[] | ICategory[];
  title?: string;
  typeParamSearch?: string;
  isTwoColumn?: boolean;
}
const ItemSidebar: React.FC<IProps> = ({
  content,
  title,
  isTwoColumn,
  typeParamSearch,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterPost = (value: IPricesOrAcreages) => {
    if (!typeParamSearch) return;
    if (searchParams.has(PARAMS_SEARCH.PRICE)) {
      searchParams.delete(PARAMS_SEARCH.PRICE);
    }
    if (searchParams.has(PARAMS_SEARCH.ACREAGE)) {
      searchParams.delete(PARAMS_SEARCH.ACREAGE);
    }
    searchParams.set(typeParamSearch, `${value.min}-${value.max}`);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full p-4 bg-white rounded-md">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      {/* 1 hàng */}
      {!isTwoColumn && (
        <div className="flex flex-col gap-3">
          {content &&
            content.length > 0 &&
            content.map((item, index) => {
              return (
                <Link
                  to={`/${toSlug(item.value)}`}
                  className="flex items-center gap-2 pb-1 text-sm border-b border-gray-200 border-dashed cursor-pointer hover:text-orange-600"
                  key={index}
                >
                  <GrNext size={10} color="#ccc" />
                  <p>{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}
      {isTwoColumn && (
        <div className="flex flex-wrap">
          {content?.map((item, index) => (
            <div
              onClick={() => handleFilterPost(item as IPricesOrAcreages)}
              className="w-1/2 mb-4"
              key={index}
            >
              <span className="flex items-center gap-2 text-sm border-b border-gray-300 border-dashed cursor-pointer hover:text-orange-600">
                <GrNext size={10} color="#ccc" /> {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
