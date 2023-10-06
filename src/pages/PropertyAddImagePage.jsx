import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import { useParams } from "react-router-dom";
import PropertyAddImage from "../modules/Property/PropertyAddImage";

const PropertyAddImagePage = () => {
  const params = useParams();
  console.log(params);
  return (
    <LayoutHome>
      <PropertyAddImage></PropertyAddImage>
    </LayoutHome>
  );
};

export default PropertyAddImagePage;
