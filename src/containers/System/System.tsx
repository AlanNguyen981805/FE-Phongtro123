import { useSelector } from "react-redux";
import { RootStore } from "../../types/base";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constanst";
import { Header, Sidebar } from "./index";

const System = () => {
  const { isLoggedIn } = useSelector((state: RootStore) => state.auth);
  if (!isLoggedIn) return <Navigate to={path.LOGIN} replace={true} />;

  return (
    <div>
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full p-4 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
