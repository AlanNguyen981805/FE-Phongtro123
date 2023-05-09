import { AxiosResponse } from "axios";
import { apiGetCategories , apiGetAreas, apiGetPrices} from "../../services";
import { IResponseCodeValuePair, IResponsePricesOrAreas } from "../../types/cate";
import actionTypes from "./actionTypes";

export const getCategories = (): any => async (dispatch: any) => {
  try {
    const response: AxiosResponse<IResponseCodeValuePair> =
      (await apiGetCategories()) as AxiosResponse<IResponseCodeValuePair>;
    if(response.data.err === 0) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: response.data.response
        })
    } else {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            msg: response.data.msg,
            categories: null
        })
    }
  } catch (error) {
    dispatch({ type: actionTypes.GET_CATEGORIES });
  }
};

export const getAreas = (): any => async (dispatch: any) => {
  try {
    const response: AxiosResponse<IResponsePricesOrAreas> =
      (await apiGetAreas()) as AxiosResponse<IResponsePricesOrAreas>;
    if(response.data.err === 0) {
        dispatch({
            type: actionTypes.GET_ACREAGES,
            acreages: response.data.response
        })
    } else {
        dispatch({
            type: actionTypes.GET_ACREAGES,
            msg: response.data.msg,
            acreages: null
        })
    }
  } catch (error) {
    dispatch({ type: actionTypes.GET_ACREAGES });
  }
};

export const getPrices = (): any => async (dispatch: any) => {
  try {
    const response: AxiosResponse<IResponsePricesOrAreas> =
      (await apiGetPrices()) as AxiosResponse<IResponsePricesOrAreas>;
    if(response.data.err === 0) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: response.data.response
        })
    } else {
        dispatch({
            type: actionTypes.GET_PRICES,
            msg: response.data.msg,
            prices: null
        })
    }
  } catch (error) {
    dispatch({ type: actionTypes.GET_PRICES });
  }
};
