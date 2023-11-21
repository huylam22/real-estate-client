import { AnimatePresence } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Modal from "react-modal";

import { authRefreshToken, authUpdateUser } from "./store/auth/auth-slice";
import { getToken } from "./utils/auth";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
import PropertyEditPage from "./pages/PropertyEditPage";
import LayoutHome from "./layouts/LayoutHome";
import LayoutAuthentication from "./layouts/LayoutAuthentication";
Modal.setAppElement("#root");

const HomePage = lazy(() => import("./pages/HomePage"));
const PropertyListPage = lazy(() => import("./pages/PropertyListPage"));
const PropertyViewPage = lazy(() => import("./pages/PropertyViewPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const StartPropertyPage = lazy(() => import("./pages/StartPropertyPage"));
const PropertyAddImagePage = lazy(() => import("./pages/PropertyAddImagePage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
function App() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      // console.log("user");
    } else {
      const { refresh_token } = getToken();

      if (refresh_token) {
        dispatch(authRefreshToken(refresh_token));
      } else {
        dispatch(authUpdateUser({}));
      }
    }
  }, [dispatch, user]);
  return (
    <AnimatePresence>
      <Suspense fallback={<LayoutHome></LayoutHome>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/sign-up"
            element={
              <Suspense
                fallback={<LayoutAuthentication></LayoutAuthentication>}
              >
                <SignUpPage></SignUpPage>
              </Suspense>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={
              <Suspense
                fallback={<LayoutAuthentication></LayoutAuthentication>}
              >
                <SignInPage></SignInPage>
              </Suspense>
            }
          ></Route>
          <Route
            path="/properties"
            element={<PropertyListPage></PropertyListPage>}
          ></Route>
          <Route
            path="/properties/:propertyId"
            element={<PropertyViewPage></PropertyViewPage>}
          ></Route>
          <Route
            path="/properties/edit/:propertyId"
            element={<PropertyEditPage></PropertyEditPage>}
          ></Route>
          <Route
            path="/add-property"
            element={<StartPropertyPage></StartPropertyPage>}
          ></Route>
          <Route
            path="/add-property/images/:propertyId"
            element={<PropertyAddImagePage></PropertyAddImagePage>}
          ></Route>
          <Route
            path="/user-profile"
            element={<UserProfilePage></UserProfilePage>}
          ></Route>
          <Route
            path="*"
            element={<NotFoundErrorPage></NotFoundErrorPage>}
          ></Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
