import React, { useState } from "react";
import ImageUpload from "../../components/image/ImageUpload";
import { useParams } from "react-router-dom";

const PropertyAddImage = () => {
  const { propertyId } = useParams();
  // console.log(propertyId);

  return (
    <div className="p-10">
      <h1 className="text-white text-2xl p-3">
        Upload and Display Image For Your Property
      </h1>
      <ImageUpload propertyId={propertyId} />
    </div>
  );
};

export default PropertyAddImage;
