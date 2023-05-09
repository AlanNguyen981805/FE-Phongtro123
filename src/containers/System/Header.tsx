import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../types/base";
import { Link, NavLink } from "react-router-dom";
import { toSlug } from "../../ultils/function-helper";
import { path } from "../../ultils/constanst";

const notActive =
  "hover:text-[#f90] flex items-center h-full px-4 py-4 bg-headerSystem";
const active =
  "hover:text-[#f90] flex items-center  h-full px-4  ";

const Header = () => {
  const { categories } = useSelector((state: RootStore) => state.app);
  return (
    <div className="w-full flex items-center h-[50px] w-screen text-white bg-headerSystem">
      <Link to={path.HOME} className="ml-10 mr-16">
        {/* <img
          src={"https://phongtro123.com/images/logo-phongtro.svg"}
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        /> */}
        <h4 className="text-xl font-semibold">Phongtro123.com</h4>
      </Link>
      <NavLink
        className={({ isActive }) => (isActive ? active : notActive)}
        to={"/"}
      >
        Trang chủ
      </NavLink>
      {categories.map((item, index) => (
        <div key={index} className="flex items-center justify-center h-full text-sm">
          <NavLink
            className={({ isActive }) => (isActive ? active : notActive)}
            to={toSlug(item.value)}
          >
            {item.value}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Header;
