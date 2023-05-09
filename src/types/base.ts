import { AxiosResponse } from "axios";
import rootReducer from "../store/reducers/rootReducer";

export type IBaseResponseAxios<T> = AxiosResponse<T>;

export type RootStore = ReturnType<typeof rootReducer>;

export type TypeSearch = "CATEGORY" | "AREA" | "PRICE" | "ACREAGE";

export interface ISelect {
  label: string;
  value: string;
}
