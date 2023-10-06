import React, { useState, useEffect } from "react";

import {
  faBed,
  faBathtub,
  faHouseChimney,
  faDollar,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropertyInfoLoading from "./PropertyInfoLoading";

const PropertyInfo = ({ loading = false, data }) => {
  const {
    propertyAddressNumber,
    propertyAddressStreet,
    propertyPostingStatus,
    propertyBedrooms,
    propertyBathrooms,
    propertyArea,
    propertyPrice,
    propertyLandDirection,
    propertyLandType,
    propertyLandLegalStatus,
    propertyDescription,
    districtPrefix,
    provincePrefix,
    provinceName,
    districtName,
  } = data;

  const pricePerMeter = new Intl.NumberFormat().format(
    Math.round((propertyPrice * 1000000000) / propertyArea)
  );
  return (
    <>
      <div className="lg:min-w-[650px] lg:max-w-[700px] mb-10">
        <div className="flex flex-col gap-y-3">
          {loading && <PropertyInfoLoading></PropertyInfoLoading>}
          <span className="text-xl text-secondary dark:text-graySoft opacity-70">
            {propertyAddressNumber} {propertyAddressStreet} , {districtName},{" "}
            {provinceName}
          </span>
          <h1 className="mb-2 font-serif text-3xl dark:text-white font-semibold text-secondary">
            {propertyPostingStatus}
          </h1>
          <div className="flex text-start font-bold  lg:text-4xl text-2xl mb-2 items-center justify-start gap-x-1">
            <FontAwesomeIcon
              className="dark:text-white text-secondary"
              icon={faDollar}
            />
            <span className="dark:text-white text-secondary">
              {propertyPrice} tỷ |
            </span>
            <span className="dark:text-whiteSoft text-secondary ml-2 text-xl font-normal">
              {pricePerMeter} triệu/m<sup>2</sup>
            </span>
          </div>
          <div className="grid grid-cols-4 text-lg font-light lg:flex lg:gap-x-8 gap-y-2  dark:text-text4 lg:items-center text-secondary ">
            <div className="flex items-center justify-start lg:justify-between gap-x-2">
              <FontAwesomeIcon icon={faBed} />
              <span> {propertyBedrooms}</span>
            </div>
            <div className="flex items-center justify-start lg:justify-between gap-x-2">
              <FontAwesomeIcon icon={faBathtub} />
              <span> {propertyBathrooms}</span>
            </div>
            <div className="flex items-center justify-start lg:justify-between gap-x-1">
              <FontAwesomeIcon icon={faHouseChimney} />
              <span>
                {propertyArea} m<sup>2</sup>
              </span>
            </div>
            <div className="flex items-center justify-start ml-3 lg:justify-between gap-x-2">
              <FontAwesomeIcon icon={faCompass} />
              <span>{propertyLandDirection}</span>
            </div>
          </div>
          <hr className="bg-gray-800 my-8 h-[2px] bg-opacity-20"></hr>
          <h1 className="mb-3 font-serif text-2xl font-semibold text-secondary dark:text-whiteSoft">
            Tổng quan
          </h1>
          <p className="mb-3 font-serif font- text-secondary text-md dark:text-text4">
            {propertyDescription}
          </p>
          <hr className="bg-gray-800 my-8 h-[2px] bg-opacity-20"></hr>
          <h1 className="mb-3 font-serif text-2xl font-semibold text-secondary dark:text-whiteSoft">
            Thông tin cơ bản
          </h1>
          <div className="flex flex-col p-5 lg:grid lg:grid-cols-2 lg:gap-5 lg:p-0 dark:text-whiteSoft">
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light text-secondary dark:text-text4">
                  Loại hình
                </h3>
                <span className="font-medium">{propertyLandType}</span>
              </div>
              <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light text-secondary dark:text-text4">
                  Phòng ngủ
                </h3>
                <span className="font-medium">{propertyBedrooms}</span>
              </div>
              <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light text-secondary dark:text-text4">
                  Phòng tắm
                </h3>
                <span className="font-medium">{propertyBathrooms}</span>
              </div>
              <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light text-secondary dark:text-text4">
                  Diện tích
                </h3>
                <span className="font-medium">
                  {propertyArea} m<sup>2</sup>
                </span>
              </div>
              <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between lg:border-none lg:pb-0 pb-2 border-b border-whiteSoft">
                <h3 className="text-base font-light text-secondary dark:text-text4">
                  Loại chủ quyền
                </h3>
                <span className="font-medium">{propertyLandLegalStatus}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base mt-2 lg:mt-0 font-light text-secondary dark:text-text4">
                  Giá bán
                </h3>
                <span className="font-medium">{propertyPrice} tỷ</span>
              </div>
            </div>
          </div>
          <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
        </div>
      </div>
    </>
  );
};

export default PropertyInfo;
