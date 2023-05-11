import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { MENU_DROPDOWN, path } from "../../ultils/constanst";
import icons from "../../ultils/icons";
import { RootStore } from "../../types/base";
import * as actions from "./../../store/actions";

const { AiOutlinePlusCircle, RiHeartLine, BiGridAlt } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenDropdown, setIsOpenDropDown] = useState(false);
  const { isLoggedIn } = useSelector((state: RootStore) => state.auth);
  const { userData } = useSelector((state: RootStore) => state.user);

  const goLogin = useCallback(
    (flag: boolean) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  const hanldeShowPopupSystem = () => {
    setIsOpenDropDown(!isOpenDropdown);
  };

  const handleClick = (id: number) => {
    if (id === 5) {
      dispatch(actions.logout());
    }
  };

  return (
    <div className="w-4/5">
      <div className="flex items-center justify-between w-full">
        <Link to={path.HOME}>
          <img
            src={"https://phongtro123.com/images/logo-phongtro.svg"}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            {!isLoggedIn && (
              <>
                <small>Phongtro123 xin chào!</small>
                <Button
                  text="Đăng nhập"
                  textColor="text-white"
                  bgColor="bg-[#3961fb]"
                  IconAfter={AiOutlinePlusCircle}
                  onClick={() => goLogin(false)}
                />
                <Button
                  text="Đăng ký"
                  textColor="text-white"
                  bgColor="bg-[#3961fb]"
                  onClick={() => goLogin(true)}
                />
              </>
            )}
            {isLoggedIn && (
              <>
                <div className="flex mr-6">
                  <div className="flex">
                    <img
                      className="h-[50px] w-[50px] object-cover rounded-full border mr-1"
                      src={
                        userData?.avatar
                          ? userData.avatar
                          : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                      }
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="">
                        Xin Chào, <b>{userData?.name}</b>
                      </span>
                      <span className="text-[12px]">
                        Mã tài khoản: <b>{userData?.id?.split("-")[0]}</b>. TK
                        chính: <b>0 VNĐ</b>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center ml-10 cursor-pointer">
                    <span className="mr-1">
                      <RiHeartLine size={24} />
                    </span>
                    <span className="text-sm hover:underline">Yêu thích</span>
                  </div>
                  <div
                    className="relative flex items-center justify-center ml-6 cursor-pointer"
                    onClick={hanldeShowPopupSystem}
                  >
                    <span className="mr-1">
                      <BiGridAlt size={24} />
                    </span>
                    <span className="text-sm select-none hover:underline">
                      Quản lý tài khoản
                    </span>
                    {isOpenDropdown && (
                      <div className="absolute w-[200px]  top-10 rounded-md bg-white shadow-md px-4 py-5 flex flex-col items-center">
                        {MENU_DROPDOWN.map((item, index) => {
                          return (
                            <div className="flex items-center w-full py-2 text-sm border-b">
                              <span className="pr-2">
                                {" "}
                                <item.icon />
                              </span>
                              <Link
                                to={item.path}
                                onClick={() => handleClick(item.id)}
                                className="text-[#1266dd] hover:text-[#f60]"
                              >
                                {item.text}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {/* <Button
                  text="Đăng xuất"
                  textColor="text-white"
                  bgColor="bg-[#3961fb]"
                  IconAfter={AiOutlinePlusCircle}
                  onClick={() => dispatch(actions.logout())}
                /> */}
              </>
            )}
          </div>
          <Button
            onClick={() => navigate(`${path.SYSTEM}${path.CREATE_POST}`)}
            text="Đăng tin mới"
            textColor="text-white"
            bgColor="bg-secondary2"
            IconAfter={AiOutlinePlusCircle}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
