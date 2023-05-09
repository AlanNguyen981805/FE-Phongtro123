import { Route, Routes, useNavigate } from "react-router-dom";
import { DetailPost, Home, HomePage, Login, Rental } from "./containers/Public";
import { path } from "./ultils/constanst";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { RootStore } from "./types/base";
import {
  CreatePost,
  EditProfile,
  ListPostByUser,
  System,
} from "./containers/System";
import ContactUs from "./containers/System/ContactUs";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootStore) => state.auth);

  useEffect(() => {
    dispatch(actions.getAreas());
    dispatch(actions.getPrices());
    dispatch(actions.getCategories());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        dispatch(actions.getCurrentUser());
      }, 1000);
      // navigate("/");
    } else {
      navigate(path.LOGIN);
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full h-full m-auto bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="" element={<HomePage />} />
          <Route path={path.HOME__PAGE} element={<HomePage />} />
          <Route path={path.DETAIL_POST} element={<DetailPost />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.LIST_POSTS_BY_USER} element={<ListPostByUser />} />
          <Route path={path.EDIT_PROFILE} element={<EditProfile />} />
          <Route path={path.CONTACT_US} element={<ContactUs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
