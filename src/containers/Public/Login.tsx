import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Location, useNavigate } from "react-router-dom";
import { IFormAuth, IFormRegister } from "../../types/auth";
import { InputForm, Button } from "./../../components/index";
import * as actions from "./../../store/actions";
import Swal from "sweetalert2";
import { RootStore } from "../../types/base";

type ILocation = Omit<Location, "state"> & { state: { flag: boolean } };
const Login = () => {
  const location: ILocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [invalidFields, setInvalidFields] = useState<any>([]);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const { isLoggedIn, msg, token } = useSelector(
    (state: RootStore) => state.auth
  );
  const [payloadAuth, setPayloadAuth] = useState<IFormRegister>({
    name: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payloadAuth
      : {
          phone: payloadAuth.phone,
          password: payloadAuth.password,
        };
    const invalids = validate(finalPayload);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payloadAuth))
        : dispatch(actions.login(payloadAuth));
  };

  const validate = (
    payload: IFormAuth | Pick<IFormAuth, "password" | "phone">
  ) => {
    let inValids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev: any) => [
          ...prev,
          { name: item[0], message: "Bạn chưa nhập giá trị" },
        ]);
        inValids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev: any) => [
              ...prev,
              { name: item[0], message: "Mật khẩu không hợp lệ" },
            ]);
            inValids++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            setInvalidFields((prev: any) => [
              ...prev,
              { name: item[0], message: "Số điện thoại không hợp lệ" },
            ]);
            inValids++;
          }
          break;

        default:
          break;
      }
    });
    return inValids;
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      navigate("/");
    }
  }, [isLoggedIn, navigate, dispatch, token]);

  useEffect(() => {
    msg && Swal.fire("oops!", msg, "error");
  }, [msg]);

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  return (
    <div className="bg-white p-[30px] pb-[100px] w-[600px] rounded-md shadow-md mt-5">
      <h3 className="text-2xl font-semibold">
        {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
      </h3>
      <div className="flex flex-col w-full gap-3">
        {isRegister && (
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label="HỌ VÀ TÊN"
            value={payloadAuth.name}
            setValue={setPayloadAuth}
            nameInput="name"
          />
        )}
        <InputForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          label="SỐ ĐIỆN THOẠI"
          value={payloadAuth.phone}
          setValue={setPayloadAuth}
          nameInput="phone"
        />
        <InputForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          label="MẬT KHẨU"
          value={payloadAuth.password}
          setValue={setPayloadAuth}
          nameInput="password"
          type="password"
        />
        <Button
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      <div className="flex items-center justify-between mt-7">
        {isRegister ? (
          <>
            <small>
              Bạn đã có tài khoản?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setIsRegister(false);
                  setPayloadAuth({ name: "", password: "", phone: "" });
                }}
              >
                Đăng nhập ngay
              </span>{" "}
            </small>
          </>
        ) : (
          <>
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Bạn quên mật khẩu
            </small>
            <small
              className="text-[blue] hover:text-[red] cursor-pointer"
              onClick={() => {
                setIsRegister(true);
                setPayloadAuth({ name: "", password: "", phone: "" });
              }}
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
