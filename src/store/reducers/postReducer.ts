import { AnyAction } from "redux";
import actionTypes from "../actions/actionTypes";

export interface IActionUser {
  type: typeof actionTypes;
  payload: object;
}

interface IPostState {
  listPost: [];
  msg: string;
  count: number;
  newPosts: [];
}
const initState: IPostState = {
  listPost: [],
  newPosts: [],
  msg: "",
  count: 0,
};

const postReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_SUCCESS:
    case actionTypes.GET_POSTS_LIMIT:
      return {
        ...state,
        listPost: action.data?.rows,
        count: action.data.count,
      } as IPostState;

    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        newPosts: action.data?.rows,
      } as IPostState;
    case actionTypes.GET_POSTS_FAIL:
      return {
        ...initState,
        msg: action.data,
      };
    default:
      return state;
  }
};

export default postReducer;
