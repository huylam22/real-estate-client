import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBathtub,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { propertyAPI } from "../../api/propertyApi";
import PropertyHeader from "./parts/PropertyHeader";

const PropertyCard = ({ item, edit = false }) => {
  const {
    districtPrefix,
    provincePrefix,
    districtName,
    propertyPostingStatus,
    propertyArea,
    propertyPrice,
    propertyAddressNumber,
    propertyAddressStreet,
    propertyCoverPaths,
    propertyBedrooms,
    propertyBathrooms,
    id,
    createdDate,
    provinceName,
  } = item;
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/properties/${id}`);
    window.scrollTo(0, 0);
  };

  const handleClickNavigateImage = () => {
    navigate(`/add-property/images/${id}`);
    window.scrollTo(0, 0);
  };

  const handleClickNavigateEdit = () => {
    navigate(`/properties/edit/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="grid h-full grid-cols-1 p-3 transition-all bg-white shadow-md cursor-pointer select-none w0 dark:bg-softDark lg:rounded-lg text-secondary hover:shadow-neutral-400">
        <div onClick={handleClickNavigate}>
          <img
            src={
              propertyCoverPaths?.length > 0
                ? propertyAPI.propertyImage(propertyCoverPaths[0])
                : propertyAPI.defaultImage
            }
            alt=""
            className="object-cover min-h-[200px] max-h-[350px] w-full mb-5 transition-all rounded-lg shadow-sm hover:shadow-neutral-300"
          ></img>

          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-4 mb-3 dark:text-white">
              <PropertyHeader>{propertyPostingStatus}</PropertyHeader>
              <span className="font-semibold text-xl w-[100px] font-serif dark:text-white">
                {propertyPrice} tỷ
              </span>
            </div>
            <div className="flex flex-col justify-between gap-4 text-start">
              <span className="text-[#ADB8CC] dark:text-text4  font-medium text-sm">
                {propertyAddressNumber} {propertyAddressStreet}, {districtName},{" "}
                {provinceName}
              </span>
              <div className="flex items-center font-light dark:text-text4 gap-x-3">
                <FontAwesomeIcon icon={faBed} />
                <span> {propertyBedrooms}</span>
                <FontAwesomeIcon icon={faBathtub} />
                <span> {propertyBathrooms}</span>
                <span>
                  <FontAwesomeIcon icon={faHouseChimney} className="mr-2" />
                  {propertyArea}m<sup>2</sup>
                </span>
              </div>
              <h3
                className={`font-medium text-[#ADB8CC] dark:text-graySoft text-sm`}
              >
                Ngày đăng:{" "}
                {createdDate === null ? "Không có dữ liệu" : `${createdDate}`}
              </h3>
            </div>
          </div>
        </div>
        {edit && (
          <div className="flex flex-col lg:gap-4 lg:flex-row">
            <button
              onClick={handleClickNavigateEdit}
              className="z-50 w-full px-4 py-2 mt-3 text-white rounded-lg bg-purple hover:bg-violet-400"
            >
              Edit
            </button>
            <button
              className="z-50 w-full px-4 py-2 mt-3 text-white rounded-lg bg-green hover:bg-violet-400"
              onClick={handleClickNavigateImage}
            >
              Images
            </button>
            <button className="z-50 w-full px-4 py-2 mt-3 text-white rounded-lg bg-error hover:bg-violet-400">
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyCard;
