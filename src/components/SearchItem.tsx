import { FC, memo } from "react";
import { TYPE_SEARCH } from "../ultils/constanst";

interface IProps {
  IconBefore?: JSX.Element;
  IconAfter?: JSX.Element;
  title: React.ReactNode;
  fontWeight?: boolean;
  setIsShowModal?: (isShowModal: boolean) => any;
  name:  keyof typeof TYPE_SEARCH
}

const SearchItem: FC<IProps> = ({
  IconAfter,
  IconBefore,
  title,
  fontWeight,
  setIsShowModal,
  name
}) => {
  
  const handleClick = () => {
    setIsShowModal && setIsShowModal(true);
  };
  
  return (
    <>
      <div className="flex items-center w-full gap-1 cursor-pointer" onClick={handleClick}>
        {IconBefore}
        <span
          className={`${
            fontWeight && "font-medium text-black"
          } w-full overflow-hidden text-ellipsis overflow-hidden whitespace-nowrap`}
        >
          {title}
        </span>
      </div>
      {IconAfter}
    </>
  );
};

export default memo(SearchItem);
