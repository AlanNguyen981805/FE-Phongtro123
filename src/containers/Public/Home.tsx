import { Outlet } from "react-router-dom";
import { Header, Navigation } from "./index";
import { Info, Contact } from "../../components";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full h-full m-auto border-red-500">
      <Header />
      <Navigation />
      <div className="flex flex-col items-center justify-start w-4/5 lg:w-4/5">
        <Outlet />
      </div>
      <Info />
      <Contact />
    </div>
  );
};

export default Home;
