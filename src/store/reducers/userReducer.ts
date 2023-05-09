import { IUser } from "../../types/user";
import actionTypes from "../actions/actionTypes";

export interface IActionUser {
  type: keyof typeof actionTypes;
  data: IUser;
}

interface IReducerUser {
  userData: IUser | null;
}

const initState: IReducerUser = {
  userData: null,
};

const userReducer = (state = initState, action: IActionUser) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER:
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        userData: action.data,
      };
    default:
      return state;
  }
};

export default userReducer;
