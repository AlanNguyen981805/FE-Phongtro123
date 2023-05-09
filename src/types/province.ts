export interface IResponseProvince<T> {
  results: T;
}

export interface ICity {
  province_id: string;
  province_name: string;
}
export interface IDistrict {
  district_id: string;
  district_name: string;
}
export interface IWard {
  ward_id: string;
  ward_name: string;
}
