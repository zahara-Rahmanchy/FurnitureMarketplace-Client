import {SideBar} from "./SideBar";
import {Outlet} from "react-router-dom";

const TradeDeck = () => {
  return (
    <div className="h-screen m-0 p-0 grid grid-cols-5">
      <div className="lg:col-span-1 md:col-span-2 col-span-5">
        <SideBar />
      </div>
      <div className="bg-gray-50 md:col-span-3 lg:col-span-4 col-span-5">
        <Outlet />
      </div>
    </div>
  );
};

export default TradeDeck;
