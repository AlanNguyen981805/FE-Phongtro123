export interface IFormAuth {
  name: string;
  password: string;
  phone: string;
}

export type IFormRegister = IFormAuth;

export type IFormLogin = Pick<IFormAuth, "password" | "phone">;

export interface IStateAuth {
  isLoggedIn: boolean;
  token: string | null;
  msg: string;
  update: boolean;
}
export interface IResponseRegister {
  err: number;
  token: string;
  msg: string;
}
