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

const PropertyCard = ({ item }) => {
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
  return (
    <div
      className="flex flex-col h-full p-3 transition-all bg-white dark:bg-softDark shadow-md cursor-pointer select-none lg:rounded-lg text-secondary hover:shadow-neutral-400"
      onClick={handleClickNavigate}
    >
      <img
        src={
          propertyCoverPaths?.length > 0
            ? propertyAPI.propertyImage(propertyCoverPaths[0])
            : propertyAPI.defaultImage
        }
        alt=""
        className="w-full h-[250px] object-cover rounded-lg shadow-sm hover:shadow-neutral-300  transition-all  mb-5"
      ></img>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between gap-4 mb-3 dark:text-white">
          <PropertyHeader>{propertyPostingStatus}</PropertyHeader>
          <span className="font-semibold text-xl w-[100px] font-serif dark:text-white">
            {propertyPrice} tỷ
          </span>
        </div>
        <div className="flex flex-col justify-between text-start gap-4">
          <span className="text-[#ADB8CC] dark:text-text4  font-medium text-sm">
            {propertyAddressNumber} {propertyAddressStreet}, {districtName},{" "}
            {provinceName}
          </span>
          <div className="flex items-center dark:text-text4 font-light gap-x-3">
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
  );
};

export default PropertyCard;
