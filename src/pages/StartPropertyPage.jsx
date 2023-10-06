import React, { useEffect, useState } from "react";
import LayoutHome from "../layouts/LayoutHome";
import PropertyAddNew from "../modules/Property/PropertyAddNew";
import RequiredAuthPage from "./RequiredAuthPage";

const StartPropertyPage = () => {
  return (
    <LayoutHome>
      <RequiredAuthPage>
        <div className="mt-7">
          <PropertyAddNew></PropertyAddNew>
        </div>
      </RequiredAuthPage>
    </LayoutHome>
  );
};

export default StartPropertyPage;
