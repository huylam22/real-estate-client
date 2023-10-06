import React from "react";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBathtub,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";

const PropertyCardLoading = () => {
  return (
    <div className="bg-white dark:bg-darkSoft p-3 rounded-xl shadow-sm flex flex-col">
      <div className="w-full h-[250px] object-cover rounded-lg shadow-sm hover:shadow-neutral-300  transition-all  mb-5">
        <LoadingSkeleton height="100%" radius="16px"></LoadingSkeleton>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <div className="text-xl text-black dark:text-white font-semibold mb-4 !leading-loose">
          <LoadingSkeleton height="20px"></LoadingSkeleton>
        </div>
        <div className="text-[#999] dark:text-whiteSoft text-lg mb-6">
          <LoadingSkeleton height="10px"></LoadingSkeleton>
          <div className="h-1"></div>
          <LoadingSkeleton height="10px"></LoadingSkeleton>
          <div className="h-1"></div>
          <LoadingSkeleton height="10px"></LoadingSkeleton>
        </div>
        <div className="flex dark:text-white items-center gap-x-3 mt-auto">
          <FontAwesomeIcon icon={faBed} />
          <span className="text-sm font-semibold text-[#333]">
            <LoadingSkeleton height="10px" width="20px"></LoadingSkeleton>
          </span>
          <FontAwesomeIcon icon={faBathtub} />
          <span className="text-sm font-semibold text-[#333]">
            <LoadingSkeleton height="10px" width="20px"></LoadingSkeleton>
          </span>
          <FontAwesomeIcon icon={faHouseChimney} />
          <span className="text-sm font-semibold text-[#333]">
            <LoadingSkeleton height="10px" width="20px"></LoadingSkeleton>
          </span>
        </div>
        <div className="text-[#999] text-lg mt-2">
          <LoadingSkeleton height="10px"></LoadingSkeleton>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardLoading;
