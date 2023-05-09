import { AnyAction } from "redux";
import { ICategory, IPricesOrAcreages } from "../../types/cate";
import actionTypes from "../actions/actionTypes";

export interface IActionUser {
  type: typeof actionTypes;
  payload: object;
}

interface ICateState {
  msg: string;
  categories: ICategory[];
  acreages: IPricesOrAcreages[];
  prices: IPricesOrAcreages[];
}
const initState: ICateState = {
  msg: "",
  categories: [],
  acreages: [],
  prices: [],
};

const appReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
      } as ICateState;
    case actionTypes.GET_ACREAGES:
      return {
        ...state,
        acreages: action.acreages || [],
      } as ICateState;
    case actionTypes.GET_PRICES:
      return {
        ...state,
        prices: action.prices || [],
      } as ICateState;
    default:
      return state;
  }
};

export default appReducer;
