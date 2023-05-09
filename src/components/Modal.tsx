import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { ICategory, ICodeValuePair } from "../types/cate";
import { TYPE_SEARCH } from "../ultils/constanst";
import { ISearchSeleted } from "../containers/Public/Search";
import { getNumbersArea, getNumbersPrice } from "../ultils/function-helper";

const { GrLinkPrevious } = icons;

interface IProps {
  setIsShowModal?: (iShow: boolean) => void;
  contentSearch: ICategory[] | ICodeValuePair[];
  typeSearch: keyof typeof TYPE_SEARCH | null;
  titleModal: string;
  setValueSelected: (value: any) => void;
  valueSelected: ISearchSeleted | null;
}

const Modal: React.FC<IProps> = ({
  setIsShowModal,
  contentSearch,
  typeSearch,
  titleModal,
  valueSelected,
  setValueSelected,
}) => {
  const [range1, setRange1] = useState(0);
  const [range2, setRange2] = useState(100);
  const [priceSelected, setPriceSelected] = useState("");

  const handleClick = () => {
    setIsShowModal && setIsShowModal(false);
  };

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const found = contentSearch.find((item) => item.code === e.target.value);
    if (found) {
      setValueSelected((prev: ISearchSeleted) => ({
        ...prev,
        [typeSearch?.toLowerCase() + "Code"]: found,
      }));
    }
    setIsShowModal && setIsShowModal(false);
  };

  const handleClickStack = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isValueDefault?: number
  ) => {
    e.stopPropagation();
    const trackEl = document.getElementById("track");
    const stackRect = trackEl?.getBoundingClientRect();
    if (!stackRect) return;
    let percent = isValueDefault
      ? isValueDefault
      : Math.round(((e.clientX - stackRect?.left) * 100) / stackRect?.width);

    if (Math.abs(percent - range1) <= Math.abs(percent - range2)) {
      setRange1(percent);
    } else {
      setRange2(percent);
    }
  };

  const convertto100 = (percent: number) => {
    let target =
      typeSearch === TYPE_SEARCH.PRICE
        ? 15
        : typeSearch === TYPE_SEARCH.ACREAGE
        ? 90
        : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleClickSelected = (item: ICodeValuePair) => {
    console.log(priceSelected);
    setPriceSelected(item.value);
    let arrMaxMin =
      typeSearch === TYPE_SEARCH.PRICE
        ? getNumbersPrice(item.value)
        : getNumbersArea(item.value);

    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setRange1(0);
        setRange2(convertto100(1));
      }
      if (arrMaxMin[0] === 20) {
        setRange1(0);
        setRange2(convertto100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setRange1(100);
        setRange2(100);
      }
    }
    if (arrMaxMin.length === 2) {
      arrMaxMin[0] && setRange1(convertto100(arrMaxMin[0]));
      arrMaxMin[1] && setRange2(convertto100(arrMaxMin[1]));
    }
  };

  const convert100toTarget = (percent: number) => {
    return typeSearch === TYPE_SEARCH.PRICE
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : typeSearch === TYPE_SEARCH.ACREAGE
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };

  const handleSubmit = () => {
    let min = range1 <= range2 ? range1 : range2;
    let max = range1 <= range2 ? range2 : range1;

    // [1, 2] or [2,3] or [3,4]
    let arrMinMax = [convert100toTarget(min), convert100toTarget(max)];

    // convert [1,2] to TU1DEN2TRIEU
    setValueSelected((prev: ISearchSeleted) => ({
      ...prev,
      [typeSearch?.toLowerCase() + "Code"]: {
        code: `${
          typeSearch === TYPE_SEARCH.PRICE
            ? arrMinMax[0] * 1000000
            : arrMinMax[0]
        }-${
          typeSearch === TYPE_SEARCH.PRICE
            ? arrMinMax[1] * 1000000
            : arrMinMax[1]
        }`,
        value: `Từ ${arrMinMax[0]} - ${arrMinMax[1]} ${
          typeSearch === TYPE_SEARCH.PRICE ? "triệu" : "m²"
        }`,
      },
    }));
    setIsShowModal && setIsShowModal(false);
  };

  const checkSelected = (item: ICodeValuePair) => {
    if (typeSearch === TYPE_SEARCH.CATEGORY)
      return item.code === valueSelected?.categoryCode?.code;
    if (typeSearch === TYPE_SEARCH.AREA)
      return item.code === valueSelected?.areaCode?.value;
  };

  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");
    if (activedTrackEl) {
      if (range2 <= range1) {
        activedTrackEl.style.left = `${range2}%`;
        activedTrackEl.style.right = `${100 - range1}%`;
      } else {
        activedTrackEl.style.left = `${range1}%`;
        activedTrackEl.style.right = `${100 - range2}%`;
      }
    }
  }, [range1, range2]);

  useEffect(() => {
    console.log(valueSelected);
    if (typeSearch === TYPE_SEARCH.PRICE) {
      if (!valueSelected?.priceCode) return;
      setPriceSelected(valueSelected.priceCode.value);
      let arrMaxMin =
        typeSearch === TYPE_SEARCH.PRICE
          ? getNumbersPrice(valueSelected?.priceCode?.value)
          : getNumbersArea(valueSelected?.priceCode?.value);

      if (arrMaxMin.length === 1) {
        if (arrMaxMin[0] === 1) {
          setRange1(0);
          setRange2(convertto100(1));
        }
        if (arrMaxMin[0] === 20) {
          setRange1(0);
          setRange2(convertto100(20));
        }
        if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
          setRange1(100);
          setRange2(100);
        }
      }
      if (arrMaxMin.length === 2) {
        arrMaxMin[0] && setRange1(convertto100(arrMaxMin[0]));
        arrMaxMin[1] && setRange2(convertto100(arrMaxMin[1]));
      }
    }
    if (typeSearch === TYPE_SEARCH.ACREAGE) {
      if (!valueSelected?.acreageCode) return;
      setPriceSelected(valueSelected?.acreageCode?.value);

      let arrMaxMin =
        typeSearch === TYPE_SEARCH.ACREAGE
          ? getNumbersPrice(valueSelected?.acreageCode?.value)
          : getNumbersArea(valueSelected?.acreageCode?.value);

      if (arrMaxMin.length === 1) {
        if (arrMaxMin[0] === 1) {
          setRange1(0);
          setRange2(convertto100(1));
        }
        if (arrMaxMin[0] === 20) {
          setRange1(0);
          setRange2(convertto100(20));
        }
        if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
          setRange1(100);
          setRange2(100);
        }
      }
      if (arrMaxMin.length === 2) {
        arrMaxMin[0] && setRange1(convertto100(arrMaxMin[0]));
        arrMaxMin[1] && setRange2(convertto100(arrMaxMin[1]));
      }
    }
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-overlay-70">
      <div className="w-2/5 h-[500px] overflow-y-scroll bg-white rounded-md relative">
        <div className="h-[45px] px-4 flex items-center border-b border-gray-200">
          <GrLinkPrevious
            size={24}
            onClick={handleClick}
            className="cursor-pointer"
          />
          <span className="w-full text-xl font-semibold text-center">
            {titleModal}
          </span>
        </div>
        <div className="flex flex-col p-4">
          {(typeSearch === TYPE_SEARCH.CATEGORY ||
            typeSearch === TYPE_SEARCH.AREA) &&
            contentSearch.length > 0 &&
            contentSearch.map((item, index) => {
              return (
                <span
                  key={index}
                  className="items-center gap-2 py-2 border-b border-gray-200 cursor-pointer hover:text-gray-500"
                >
                  <input
                    checked={checkSelected(item)}
                    id={item.code}
                    name={typeSearch?.toUpperCase()}
                    type="radio"
                    className=""
                    value={item.code}
                    onChange={(e) => handleChangeRadio(e)}
                  />
                  <label htmlFor={item.code} className="pl-2 cursor-pointer">
                    {item.value}
                  </label>
                </span>
              );
            })}

          {(typeSearch === TYPE_SEARCH.PRICE ||
            typeSearch === TYPE_SEARCH.ACREAGE) && (
            <div className="py-20">
              <div className="relative flex flex-col items-center justify-center">
                <div className="absolute top-[-48px] font-semibold text-xl text-orange-500">
                  {range1 === 100 && range2 === 100
                    ? `Trên ${convert100toTarget(range1)} ${
                        typeSearch === TYPE_SEARCH.ACREAGE ? "triệu" : "m2"
                      } +`
                    : `Từ ${
                        range1 <= range2
                          ? convert100toTarget(range1)
                          : convert100toTarget(range2)
                      } - ${
                        range2 >= range1
                          ? convert100toTarget(range2)
                          : convert100toTarget(range1)
                      } ${typeSearch === TYPE_SEARCH.PRICE ? "triệu" : "m2"}`}
                </div>
                <div
                  id="track"
                  onClick={(e) => handleClickStack(e)}
                  className="slider-track h-[5px] bg-gray-300 rounded-md absolute top-0 bottom-0 w-full"
                ></div>
                <div
                  onClick={(e) => handleClickStack(e)}
                  id="track-active"
                  className="slider-track-active h-[5px] bg-orange-600 rounded-full absolute top-0 bottom-0 right-0"
                ></div>
                <input
                  className="absolute top-0 bottom-0 w-full appearance-none pointer-events-none"
                  type="range"
                  step="1"
                  min="0"
                  max="100"
                  value={range1}
                  onChange={(e) => {
                    setRange1(+e.target.value);
                    priceSelected && setValueSelected("");
                  }}
                />
                <input
                  className="absolute top-0 bottom-0 w-full appearance-none pointer-events-none"
                  type="range"
                  step="1"
                  min="0"
                  max="100"
                  value={range2}
                  onChange={(e) => {
                    setRange2(+e.target.value);
                    priceSelected && setValueSelected("");
                  }}
                />
                <div className="absolute left-0 right-0 z-30 flex items-center justify-between top-6">
                  <div
                    className="cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickStack(e, 0);
                    }}
                  >
                    0
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickStack(e, 100);
                    }}
                  >
                    {typeSearch === TYPE_SEARCH.PRICE
                      ? "15 Triệu+"
                      : "Trên 90m2"}
                  </div>
                </div>
              </div>
              <div className="mt-24">
                <h4 className="mb-4 font-medium">Chọn nhanh:</h4>
                <div className="flex flex-wrap items-center w-full gap-2 ">
                  {contentSearch.map((item, index) => {
                    return (
                      <button
                        onClick={() => handleClickSelected(item)}
                        key={index}
                        className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer active:bg-blue-500 ${
                          item.value === priceSelected
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                      >
                        {item.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        {(typeSearch === TYPE_SEARCH.PRICE ||
          typeSearch === TYPE_SEARCH.ACREAGE) && (
          <button
            type="button"
            className="w-full absolute bottom-0 bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md"
            onClick={handleSubmit}
          >
            ÁP DỤNG
          </button>
        )}
      </div>
    </div>
  );
};
export default memo(Modal);
