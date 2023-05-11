import { useEffect, useState } from "react";
import { Select, Input } from "./index";
import { apiGetCity, apiGetDisrict, apiGetWards } from "./../../services";
import { ISelect } from "../../types/base";
import { IFormPost } from "../../types/post";
import debounce from "lodash.debounce";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface IProps {
  setAddressCuThe: React.Dispatch<React.SetStateAction<string>>;
  addressCuThe: string;
  register: UseFormRegister<IFormPost>;
  errors: any;
  setValue: UseFormSetValue<IFormPost>;
}

const Address: React.FC<IProps> = ({
  register,
  setAddressCuThe,
  addressCuThe,
  errors,
  setValue,
}) => {
  const searchDebounce = debounce((value) => setAddressCuThe(value), 1000);
  const [cities, setCities] = useState<ISelect[] | null>(null);
  const [citySelected, setCitySelected] = useState("");
  const [districts, setDistricts] = useState<ISelect[] | null>(null);
  const [districtSelected, setDistrictSelected] = useState("");
  const [wards, setWards] = useState<ISelect[] | null>(null);
  const [wardSelected, setWardSelected] = useState("");
  const [address] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const onChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCitySelected(e.target.value);
    const found = cities?.find((item) => item.value === e.target.value)
    if(!found) return
    setValue("nameCity", found?.label)
  };

  const onChangeDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrictSelected(e.target.value);
    const found = districts?.find((item) => item.value === e.target.value)
    if(!found) return
    setValue("nameDistrict", found?.label)
  };

  const onChangeWard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWardSelected(e.target.value);
    const found = wards?.find((item) => item.value === e.target.value)
    if(!found) return
    setValue("nameWard", found?.label)
  };

  const getCities = async () => {
    try {
      const response = await apiGetCity();
      const transform: ISelect[] = response.data.results.map((item) => ({
        label: item.province_name,
        value: item.province_id,
      }));
      setCities(transform);
    } catch (error) {
      console.log(error);
    }
  };
  const getDistricts = async () => {
    try {
      const response = await apiGetDisrict(citySelected);
      const transform: ISelect[] = response.data.results.map((item) => ({
        label: item.district_name,
        value: item.district_id,
      }));
      setDistricts(transform);
    } catch (error) {}
  };
  const getWards = async () => {
    try {
      const response: any = await apiGetWards(districtSelected);
      const transform = response.data.results.map((item: any) => ({
        label: item.ward_name,
        value: item.ward_id,
      }));
      setWards(transform);
    } catch (error) {
      console.log(error);
    }
  };

  const getFullAddress = () => {
    let fullAddress: any = " ";
    if (addressCuThe) {
      fullAddress = addressCuThe + ", ";
    }
    if (wardSelected) {
      fullAddress +=
        wards?.find((item) => item.value === wardSelected)?.label.toString() +
        ", ";
    }
    if (districtSelected) {
      fullAddress +=
        districts
          ?.find((item) => item.value === districtSelected)
          ?.label.toString() + ", ";
    }
    if (citySelected) {
      fullAddress += cities
        ?.find((item) => item.value === citySelected)
        ?.label.toString();
    }
    setValue("fullAddress", fullAddress);
    return fullAddress;
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    searchDebounce(address);
    return () => searchDebounce.cancel();
  }, [address]);

  useEffect(() => {
    citySelected && getDistricts();
  }, [citySelected]);

  useEffect(() => {
    districtSelected && getWards();
  }, [districtSelected]);

  useEffect(() => {
    setFullAddress(getFullAddress());
  }, [districtSelected, citySelected, wardSelected, addressCuThe, fullAddress]);

  return (
    <>
      <div className="flex mt-2">
        <div className="w-2/6 mr-2">
          <Select
            label="Tỉnh/Thành phố"
            options={cities}
            // onChange={onChangeCity}
            registerField={register("city", {
              required: "Vui lòng nhập địa chỉ",
              onChange: onChangeCity,
            })}
            error={errors.city}
            name="city"
          />
        </div>
        <div className="w-2/6 mr-2">
          <Select
            label="Quận/Huyện"
            options={districts}
            registerField={register("district", {
              onChange: onChangeDistrict,
            })}
            // onChange={onChangeDistrict}
            name="district"
            error={errors.district}
          />
        </div>
        <div className="w-2/6 mr-2">
          <Select
            label="Phường/Xã"
            options={wards}
            // onChange={onChangeWard}
            registerField={register("ward", {
              onChange: onChangeWard,
            })}
            name="ward"
            error={errors.ward}
          />
        </div>
      </div>
      <div className="w-2/6 mt-2">
        <Input
          label="Số nhà"
          name="address"
          registerField={register("address", {
            onChange: (e) => searchDebounce(e.target.value),
          })}
          error={errors?.address}
          // onChange={}
        />
      </div>

      <div className="w-full mt-4">
        <Input
          registerField={register("fullAddress")}
          label="Địa chỉ chính xác"
          name="fullAddress"
          value={fullAddress}
          readonly
        />
      </div>
    </>
  );
};

export default Address;
