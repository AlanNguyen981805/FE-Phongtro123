import {  useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootStore } from "../../types/base";
import { ICodeValuePair } from "../../types/cate";
import { toSlug } from "../../ultils/function-helper";

const notActive =
  "hover:bg-secondary2 flex items-center h-full px-4 py-4 bg-secondary1";
const active =
  "hover:bg-secondary2 flex items-center  h-full px-4  bg-secondary2";

const Navigation = () => {
  const { categories } = useSelector((state: RootStore) => state.app);

  return (
    <div className="w-full flex items-center justify-center h-[40px] w-screen text-white bg-secondary1">
      <div className="flex items-center w-4/5 h-full text-sm font-medium">
        <NavLink
          className={({ isActive }) => (isActive ? active : notActive)}
          to={"/"}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item: ICodeValuePair, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center h-full"
              >
                <NavLink
                  className={({ isActive }) => (isActive ? active : notActive)}
                  to={toSlug(item.value)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
