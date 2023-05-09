import { memo } from "react";
import { Location } from "../ultils/constanst";
import ProvinceBtn from "./ProvinceBtn";

const Province = () => {
  return (
    <div className="flex items-center justify-center gap-5 py-5 ">
      {Location.map((item, index) => {
        return <ProvinceBtn key={index} title={item.name} image={item.image} />;
      })}
    </div>
  );
};

export default memo(Province);
