export interface IResponseCodeValuePair {
  err: number;
  msg: string;
  response: ICodeValuePair[];
}

export interface IResponseCategory {
  err: number;
  msg: string;
  response: ICategory[];
}

export interface ICodeValuePair {
  code: string;
  value: string;
}

export interface IPricesOrAcreages extends ICodeValuePair {
  min: string;
  max: string
}

export interface IResponsePricesOrAreas {
  err: number;
  msg: string;
  response: IPricesOrAcreages[];
}


export interface ICategory extends ICodeValuePair {
  header: string;
  subHeader: string
}
