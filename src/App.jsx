import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Modal from "react-modal";
import LayoutHome from "./layouts/LayoutHome";
import HomePage from "./pages/HomePage";
import PropertyListPage from "./pages/PropertyListPage";
import PropertyViewPage from "./pages/PropertyViewPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StartPropertyPage from "./pages/StartPropertyPage";
import PropertyAddImagePage from "./pages/PropertyAddImagePage";
import UserProfilePage from "./pages/UserProfilePage";
import { authRefreshToken, authUpdateUser } from "./store/auth/auth-slice";
import { getToken } from "./utils/auth";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
Modal.setAppElement("#root");

function App() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      console.log("user");
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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route
          path="/properties"
          element={<PropertyListPage></PropertyListPage>}
        ></Route>
        <Route
          path="/properties/:propertyId"
          element={<PropertyViewPage></PropertyViewPage>}
        ></Route>
        <Route
          path="/new-property"
          element={<StartPropertyPage></StartPropertyPage>}
        ></Route>
        <Route
          path="/new-property/:propertyId"
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
    </AnimatePresence>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import "./App.css";

// import { useDispatch, useSelector } from "react-redux";
// import { Suspense, lazy, useEffect } from "react";
// import { authRefreshToken, authUpdateUser } from "./store/auth/auth-slice";
// import { getToken, logOut } from "./utils/auth";
// const StartPropertyPage = lazy(() => import("./pages/StartPropertyPage"));
// const LayoutHome = lazy(() => import("./layouts/LayoutHome"));
// const HomePage = lazy(() => import("./pages/HomePage"));
// const PropertyListPage = lazy(() => import("./pages/PropertyListPage"));
// const PropertyView = lazy(() => import("./pages/PropertyViewPage"));
// const SignUpPage = lazy(() => import("./pages/SignUpPage"));
// const SignInPage = lazy(() => import("./pages/SignInPage"));
// function App() {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (user) {
//     } else {
//       const { refresh_token } = getToken();
//       if (refresh_token) {
//         dispatch(authRefreshToken(refresh_token));
//       } else {
//         dispatch(authUpdateUser({}));
//         logOut();
//       }
//     }
//   }, [dispatch, user]);
//   return (
//     <Suspense>
//       <Routes>
//         <Route path="/" element={<HomePage></HomePage>}></Route>
//         <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
//         <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
//         <Route
//           path="/properties"
//           element={<PropertyListPage></PropertyListPage>}
//         ></Route>
//         <Route
//           path="/new-property"
//           element={<StartPropertyPage></StartPropertyPage>}
//         ></Route>
//         <Route
//           path="/properties/:propertyId"
//           element={<PropertyView></PropertyView>}
//         ></Route>
//         <Route path="*" element={<LayoutHome>Not Found</LayoutHome>}></Route>
//       </Routes>
//     </Suspense>
//   );
// }

// export default App;
