export interface IResponsePosts {
  err: number;
  msg: string;
  response: IPost[];
}

export interface IPost {
  id?: string;
  title: string;
  star: string;
  labelCode: string;
  address: string;
  acreage: string;
  attributesId: string;
  categoryCode: string;
  description: string;
  userId: string;
  price: string;
  overviewId: string;
  imagesId: string;
  createdAt: string;
  updatedAt: string;
  endDate: string;
  view: number;
  image: {
    images: string;
  };
  attr: {
    price: string;
    acreage: string;
    published: string;
    hashtag: string;
  };
  user: {
    name: string;
    avatar: string;
    fbUrl?: string;
    zalo?: string;
    phone: string;
  };
}

export interface IFormPost {
  idUser: string;
  category: string;
  title: string;
  desc: string;
  price: string;
  acreage: string;
  rental_obj: string;
  media: string;
  phone: string;
  address: string;
  city: string;
  nameCity: string;
  nameDistrict: string;
  nameWard: string;
  district: string;
  ward: string;
  fullAddress: string;
  fullName: string;
}
