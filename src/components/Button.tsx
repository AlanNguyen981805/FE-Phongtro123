import { FC, memo } from "react";

interface IProps {
  text: string;
  textColor?: string;
  bgColor: string;
  IconAfter?: FC;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
}
const Button: FC<IProps> = ({
  text,
  textColor,
  bgColor,
  IconAfter,
  onClick,
  className,
  fullWidth,
}) => {
  return (
    <button
      type="button"
      className={`py-2 px-4 ${textColor} ${className} ${
        fullWidth && "w-full"
      } flex items-center  ${bgColor} outline-none rounded-md hover:underline justify-center gap-5`}
      onClick={onClick}
    >
      <span>{text}</span>
      {IconAfter && <span>{<IconAfter />}</span>}
    </button>
  );
};

export default memo(Button);
