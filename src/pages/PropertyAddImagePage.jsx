import React from "react";
import { useParams } from "react-router-dom";
import LayoutHome from "../layouts/LayoutHome";
import PropertyAddImage from "../modules/Property/PropertyAddImage";

const PropertyAddImagePage = () => {
  const params = useParams();
  // console.log(params);
  return (
    <LayoutHome>
      <PropertyAddImage></PropertyAddImage>
    </LayoutHome>
  );
};

export default PropertyAddImagePage;
