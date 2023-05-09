export interface IResponseUser {
  err: number;
  msg: string;
  response: IUser;
}

export interface IUser {
  id?: string;
  name: string;
  phone: string;
  zalo?: string;
  fbUrl?: string;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type IFormUser = Pick<
  IUser,
  "id" | "name" | "phone" | "zalo" | "fbUrl" | "avatar" | "avatar"
>;
