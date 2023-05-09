import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../store/actions";
import { RootStore } from "../types/base";
import { ItemNewPost } from "../components";

const RelatePosts = () => {
  const dispatch = useDispatch();
  const { newPosts } = useSelector((state: RootStore) => state.post);

  useEffect(() => {
    dispatch(actions.getNewPosts());
  }, []);
  return (
    <div className="w-full p-4 mb-4 bg-white rounded-md">
      <h3 className="mb-4 text-xl font-semibold">Tin mới đăng</h3>

      <div>
        {newPosts?.length > 0 &&
          newPosts.map((item: any, index: number) => {
            return (
              <ItemNewPost
                createdAt={item.createdAt}
                imgUrl={item.image.images.split(",")[0]}
                price={item.attr.price}
                title={item.title}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatePosts;
