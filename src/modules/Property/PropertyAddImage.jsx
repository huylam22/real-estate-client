import React, { useState } from "react";
import ImageUpload from "../../components/image/ImageUpload";
import { useParams } from "react-router-dom";

const PropertyAddImage = () => {
  const { propertyId } = useParams();
  // console.log(propertyId);

  return (
    <div className="pt-28 lg:p-10">
      <h1 className="p-3 text-2xl text-primary dark:text-white">
        (Upload or Drag & Drop Images) to Display Image For Your Property
      </h1>
      <ImageUpload propertyId={propertyId} />
    </div>
  );
};

export default PropertyAddImage;
