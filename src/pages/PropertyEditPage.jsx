import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import RequiredAuthPage from "./RequiredAuthPage";
import PropertyEdit from "../modules/Property/PropertyEdit";

const PropertyEditPage = () => {
  return (
    <LayoutHome>
      <RequiredAuthPage>
        <div className="mt-7">
          <PropertyEdit></PropertyEdit>
        </div>
      </RequiredAuthPage>
    </LayoutHome>
  );
};

export default PropertyEditPage;
