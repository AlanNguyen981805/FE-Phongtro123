import { AxiosResponse } from "axios";
import {
  apiGetPosts,
  apiGetPostsLimit,
  apiGetNewPosts,
} from "../../services/post";
import { IResponsePosts } from "../../types/post";
import actionTypes from "./actionTypes";

export const getPosts = (): any => async (dispatch: any) => {
  try {
    const response: AxiosResponse<IResponsePosts> =
      (await apiGetPosts()) as AxiosResponse<IResponsePosts>;
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_SUCCESS,
        data: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({ type: actionTypes.GET_POSTS_FAIL });
  }
};

export const getPostsLimit =
  (query?: string): any =>
  async (dispatch: any) => {
    try {
      const response: AxiosResponse<IResponsePosts> = (await apiGetPostsLimit(
        query
      )) as AxiosResponse<IResponsePosts>;
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.GET_POSTS_LIMIT,
          data: response.data.response,
        });
      } else {
        dispatch({
          type: actionTypes.GET_POSTS_LIMIT,
          data: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({ type: actionTypes.GET_POSTS_LIMIT });
    }
  };

export const getNewPosts = (): any => async (dispatch: any) => {
  try {
    const response: AxiosResponse<IResponsePosts> =
      (await apiGetNewPosts()) as AxiosResponse<IResponsePosts>;
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        data: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({ type: actionTypes.GET_NEW_POSTS });
  }
};
