import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import PropertyAddImage from "../modules/Property/PropertyAddImage";
import RequiredAuthPage from "./RequiredAuthPage";

const PropertyAddImagePage = () => {
  return (
    <LayoutHome>
      <RequiredAuthPage>
        <PropertyAddImage></PropertyAddImage>
      </RequiredAuthPage>
    </LayoutHome>
  );
};

export default PropertyAddImagePage;
