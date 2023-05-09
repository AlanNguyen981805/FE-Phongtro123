import { AnyAction } from "redux";
import { IStateAuth } from "../../types/auth";
import actionTypes from "../actions/actionTypes";

export interface IActionUser {
  type: typeof actionTypes;
  payload: object;
}
const initState: IStateAuth = {
  isLoggedIn: true,
  token: null,
  msg: "",
  update: false
};

const authReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      window.localStorage.setItem('auth', JSON.stringify(state))
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        msg: ''
      } as IStateAuth;
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        msg: action.data,
        update: !state.update
      } as IStateAuth;
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        msg: "",
        token: null,
      } as IStateAuth;

    default:
      return state;
  }
};

export default authReducer;
