import { useEffect, useState } from "react";
import SearchItem from "../../components/SearchItem";
import icons from "../../ultils/icons";
import { Modal } from "../../components";
import { PARAMS_SEARCH, TYPE_SEARCH } from "../../ultils/constanst";
import { useSelector } from "react-redux";
import { RootStore } from "../../types/base";
import { ICategory, ICodeValuePair } from "../../types/cate";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toSlug } from "../../ultils/function-helper";
import { apiGetCity } from "../../services";

const {
  BsChevronRight,
  HiOutlineLocationMarker,
  FiSearch,
  MdOutlineHouseSiding,
} = icons;

interface IValueClickModal {
  typeSearch: keyof typeof TYPE_SEARCH;
  content?: ICategory[] | ICodeValuePair[];
  titleModal: string;
}

export interface ISearchSeleted {
  areaCode?: {
    code?: string;
    value: string;
  };
  priceCode?: {
    code?: string;
    value: string;
  };
  acreageCode?: {
    code?: string;
    value: string;
  };
  categoryCode?: {
    code?: string;
    value?: string;
    header?: string;
    subHeader?: string;
  };
}

const Search = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [typeSearch, setTypeSearch] = useState<keyof typeof TYPE_SEARCH | null>(
    null
  );
  const [contentSearch, setContentSearch] = useState<
    ICategory[] | ICodeValuePair[]
  >([]);
  const [valueSelected, setValueSelected] = useState<ISearchSeleted | null>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { acreages, categories, prices } = useSelector(
    (state: RootStore) => state.app
  );
  const [params] = useSearchParams();

  const handleShowModal = async ({
    typeSearch,
    content,
    titleModal,
  }: IValueClickModal) => {
    setTypeSearch(typeSearch);
    setTitleModal(titleModal);

    if (typeSearch === "AREA") {
      const data = await getArea();
      const tranforms = data?.map((item) => ({
        code: item.province_name,
        value: item.province_name,
      }));
      setContentSearch(tranforms as ICodeValuePair[]);
      return;
    }
    if (content) setContentSearch(content);
    else setContentSearch([]);
  };

  const getArea = async () => {
    try {
      const res = await apiGetCity();
      if (res) return res.data.results;
    } catch (error) {
      return [];
    }
  };

  const handleSearch = () => {
    console.log(valueSelected);
    const queryParams = new URLSearchParams(location.search);
    if (valueSelected?.areaCode?.code) {
      queryParams.set(PARAMS_SEARCH.AREA, valueSelected.areaCode.code);
    }
    if (valueSelected?.categoryCode?.code) {
      queryParams.set(PARAMS_SEARCH.CATEGORY, valueSelected.categoryCode.code);
    }
    if (valueSelected?.priceCode?.code) {
      queryParams.set(PARAMS_SEARCH.PRICE, valueSelected.priceCode.code);
    }
    if (valueSelected?.acreageCode?.code) {
      queryParams.set(PARAMS_SEARCH.ACREAGE, valueSelected.acreageCode.code);
    }

    if (valueSelected?.categoryCode?.value) {
      const slug = toSlug(valueSelected.categoryCode.value);
      navigate({ pathname: `/${slug}`, search: queryParams.toString() });
    } else {
      navigate({ pathname: location.pathname, search: queryParams.toString() });
    }
  };

  useEffect(() => {
    const price = params.get("price");
    const acreage = params.get("acreage");
    const categoryCode = params.get("categoryCode");
    const areaCode = params.get("area");

    const splitPrice = price?.split("-");
    const splitAcreage = acreage?.split("-");
    if (splitPrice) {
      setValueSelected({
        priceCode: {
          value: `Từ ${Number(splitPrice?.[0]) / 1000000} - ${
            Number(splitPrice?.[1]) / 1000000
          } triệu`,
        },
      });
    }
    if (categoryCode) {
      const found = categories.find((item) => item.code === categoryCode);
      setValueSelected((prev) => ({
        ...prev,
        categoryCode: found,
      }));
    }
    if (splitAcreage) {
      setValueSelected((prev) => ({
        ...prev,
        acreageCode: {
          value: `Từ ${Number(splitAcreage?.[0])} - ${Number(
            splitAcreage?.[1]
          )} m²`,
        },
      }));
    }
    if (areaCode) {
      setValueSelected((prev) => ({
        ...prev,
        areaCode: {
          value: areaCode,
        },
      }));
    }
  }, [categories, params]);

  return (
    <div className="mt-2 w-full my-3 p-[10px] bg-[#febb02] lg:flex-row flex flex-col rounded-md flex gap-2 ">
      <div
        className="flex items-center text-[13.3px] justify-between w-full p-2 text-sm text-gray-400 bg-white rounded-md"
        onClick={() =>
          handleShowModal({
            typeSearch: TYPE_SEARCH.CATEGORY,
            content: categories,
            titleModal: "Chọn loại bất động sản",
          })
        }
      >
        <SearchItem
          IconBefore={<MdOutlineHouseSiding />}
          title={
            valueSelected?.categoryCode?.value ? (
              <span className="font-semibold text-black">
                {valueSelected?.categoryCode?.value}
              </span>
            ) : (
              "Chọn phòng trọ, nhà trọ"
            )
          }
          name={TYPE_SEARCH.CATEGORY}
          setIsShowModal={setIsShowModal}
        />
      </div>
      <div
        className="flex items-center text-[13.3px] justify-between w-full p-2 text-sm text-gray-400 bg-white rounded-md"
        onClick={() =>
          handleShowModal({
            typeSearch: TYPE_SEARCH.AREA,
            titleModal: "Chọn tỉnh thành",
          })
        }
      >
        <SearchItem
          name={TYPE_SEARCH.AREA}
          IconBefore={<HiOutlineLocationMarker />}
          IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
          title={
            valueSelected?.areaCode?.value ? (
              <span className="font-semibold text-black">
                {valueSelected?.areaCode?.value}
              </span>
            ) : (
              "Toàn quốc"
            )
          }
          setIsShowModal={setIsShowModal}
        />
      </div>
      <div
        className="flex items-center text-[13.3px] justify-between w-full p-2 text-sm text-gray-400 bg-white rounded-md"
        onClick={() =>
          handleShowModal({
            typeSearch: TYPE_SEARCH.PRICE,
            content: prices,
            titleModal: "Chọn Giá",
          })
        }
      >
        <SearchItem
          name={TYPE_SEARCH.PRICE}
          IconBefore={<HiOutlineLocationMarker />}
          IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
          title={
            valueSelected?.priceCode?.value ? (
              <span className="font-semibold text-black">
                {valueSelected?.priceCode?.value}
              </span>
            ) : (
              "Chọn giá"
            )
          }
          setIsShowModal={setIsShowModal}
        />
      </div>
      <div
        className="flex items-center text-[13.3px] justify-between w-full p-2 text-sm text-gray-400 bg-white rounded-md"
        onClick={() =>
          handleShowModal({
            typeSearch: TYPE_SEARCH.ACREAGE,
            titleModal: "Chọn diện tích",
            content: acreages,
          })
        }
      >
        <SearchItem
          name={TYPE_SEARCH.ACREAGE}
          IconBefore={<HiOutlineLocationMarker />}
          IconAfter={<BsChevronRight color="rgb(156, 163, 175)" />}
          title={
            valueSelected?.acreageCode?.value ? (
              <span className="font-semibold text-black">
                {valueSelected?.acreageCode?.value}
              </span>
            ) : (
              "Chọn diện tích"
            )
          }
          setIsShowModal={setIsShowModal}
        />
      </div>
      <button
        type="button"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white outline-none bg-secondary1"
        onClick={handleSearch}
      >
        <FiSearch />
        Tìm Kiếm
      </button>

      {isShowModal && (
        <Modal
          titleModal={titleModal}
          typeSearch={typeSearch}
          setIsShowModal={setIsShowModal}
          contentSearch={contentSearch}
          setValueSelected={setValueSelected}
          valueSelected={valueSelected}
        />
      )}
    </div>
  );
};

export default Search;
