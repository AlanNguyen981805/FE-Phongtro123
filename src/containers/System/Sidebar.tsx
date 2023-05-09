import { useDispatch, useSelector } from "react-redux";
import { MENU_DROPDOWN } from "../../ultils/constanst";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { RootStore } from "../../types/base";

const notActive =
  " flex items-center h-full px-4 py-4 flex items-center p-3 border-b border-dashed cursor-pointer hover:bg-gray-200";
const active =
  "flex items-center  h-full px-4  bg-gray-200 flex items-center p-3 border-b border-dashed cursor-pointer ";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootStore) => state.user);

  const handleClick = (id: number) => {
    if (id === 5) {
      dispatch(actions.logout());
    }
  };
  return (
    <div className="w-[300px] border h-screen">
      <div className="w-full p-2 ">
        <div className="flex flex-col p-3 mb-2">
          <div className="flex items-center mb-2">
            <img
              className="h-[50px] w-[50px] object-cover rounded-full border mr-1"
              src={
                userData?.avatar
                  ? userData.avatar
                  : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              }
              alt=""
            />
            <div>
              <p className="font-bold ">{userData?.name}</p>
              <span className="text-sm text-gray-600">{userData?.phone}</span>
            </div>
          </div>
          <span className="flex">
            <p className="mr-1 text-sm">Mã thành viên:</p>{" "}
            <p className="text-sm font-bold">{userData?.id?.split("-")[0]}</p>
          </span>
          <span className="flex">
            <p className="mr-1 text-sm">TK Chính:</p>{" "}
            <p className="text-sm font-bold">1234</p>
          </span>
        </div>
        {MENU_DROPDOWN.map((item, index) => {
          return (
            <NavLink
              className={({ isActive }) => (isActive ? active : notActive)}
              to={item.path}
              onClick={() => handleClick(item.id)}
              key={index}
            >
              <span className="mr-1">{<item.icon />}</span>
              <p className="text-sm">{item.text}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
