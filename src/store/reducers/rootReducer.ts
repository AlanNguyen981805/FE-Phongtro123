import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import { persistReducer } from "redux-persist";
import userReducer from "./userReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { IStateAuth } from "../../types/auth";
import postReducer from "./postReducer";
import appReducer from "./appReducer";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whiteList: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer<IStateAuth>(authConfig, authReducer),
  post: postReducer,
  user: userReducer,
  app: appReducer,
});

export default rootReducer;
