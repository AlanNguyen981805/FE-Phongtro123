import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PageNumber } from "../../components";
import { RootStore } from "../../types/base";

interface IProps {
  page?: number;
}
const Pagination: React.FC<IProps> = ({ page }) => {
  const { count, listPost } = useSelector((state: RootStore) => state.post);
  const [arrPage, setArrPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);

  useEffect(() => {
    let maxPage = Math.ceil(count / listPost.length);
    if (currentPage) {
      let end = currentPage + 1 > maxPage ? maxPage : currentPage + 1;
      let start = currentPage - 1 <= 0 ? 1 : currentPage - 1;
      let temp = [];
      for (let i = start; i <= end; i++) temp.push(i);
      setArrPage(temp);
      currentPage >= maxPage - 1 ? setIsHideEnd(true) : setIsHideEnd(false);
      currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false);
    }
  }, [count, listPost, currentPage]);

  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {!isHideStart && (
        <PageNumber icon="<<" number={1} setCurrentPage={setCurrentPage} />
      )}
      {!isHideStart && <PageNumber icon="..." />}
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <PageNumber
              key={item}
              number={item}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          );
        })}
      {!isHideEnd && <PageNumber icon="..." setCurrentPage={setCurrentPage} />}
      {!isHideEnd && (
        <PageNumber
          icon=">>"
          setCurrentPage={setCurrentPage}
          type="end"
          number={Math.ceil(count / listPost.length)}
        />
      )}
    </div>
  );
};

export default Pagination;
