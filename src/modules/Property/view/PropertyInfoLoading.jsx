import React from "react";
import LoadingSkeleton from "../../../components/loading/LoadingSkeleton";
import {
  faBed,
  faBathtub,
  faHouseChimney,
  faDollar,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PropertyInfoLoading = () => {
  return (
    <div className="mb-10  mx-auto">
      <div className="flex flex-col gap-y-3">
        <span className="text-xl text-secondary dark:text-white opacity-70">
          <LoadingSkeleton height="400px"></LoadingSkeleton>
        </span>
        <div className="lg:max-w-[1080px] lg:w-full mx-auto">
          <h1 className="mb-2 font-serif dark:text-white text-3xl font-semibold text-secondary">
            <LoadingSkeleton height="40px"></LoadingSkeleton>
          </h1>
          <div className="grid grid-cols-4 dark:text-white text-lg font-light lg:flex lg:gap-x-8 gap-y-2 lg:items-center text-secondary ">
            <div className="flex items-center justify-start lg:justify-between gap-x-2">
              <FontAwesomeIcon icon={faBed} />
              <LoadingSkeleton height="20px" width="20px"></LoadingSkeleton>
            </div>
            <div className="flex items-center justify-start lg:justify-between gap-x-2">
              <FontAwesomeIcon icon={faBathtub} />
              <LoadingSkeleton height="20px" width="20px"></LoadingSkeleton>
            </div>
            <div className="flex items-center justify-start lg:justify-between gap-x-1">
              <FontAwesomeIcon icon={faHouseChimney} />
              <LoadingSkeleton height="20px" width="20px"></LoadingSkeleton>
            </div>
            <div className="flex items-center justify-start ml-3 lg:justify-between gap-x-2">
              <FontAwesomeIcon icon={faCompass} />
              <LoadingSkeleton height="20px" width="20px"></LoadingSkeleton>
            </div>
            <div className="flex items-center justify-start lg:justify-between gap-x-1">
              <FontAwesomeIcon icon={faDollar} />
              <LoadingSkeleton height="20px" width="20px"></LoadingSkeleton>
            </div>
          </div>
          <hr className="bg-gray-800 my-8 h-[2px] bg-opacity-20"></hr>
          <h1 className="mb-3 font-serif text-2xl dark:text-white font-semibold text-secondary">
            Tổng quan
          </h1>

          <LoadingSkeleton height="20px"></LoadingSkeleton>
          <LoadingSkeleton height="20px"></LoadingSkeleton>
          <LoadingSkeleton height="20px"></LoadingSkeleton>

          <hr className="bg-gray-800 my-8 h-[2px] bg-opacity-20"></hr>

          <h1 className="mb-3 font-serif text-2xl dark:text-white font-semibold text-secondary">
            Thông tin cơ bản
          </h1>
          <div className="flex flex-col p-5 lg:grid lg:grid-cols-2 lg:gap-5 lg:p-0">
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light dark:text-white text-secondary">
                  Loại hình
                </h3>
                <LoadingSkeleton height="20px" width="60px"></LoadingSkeleton>
              </div>
              <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light dark:text-white text-secondary">
                  Phòng ngủ
                </h3>
                <LoadingSkeleton height="20px" width="40px"></LoadingSkeleton>
              </div>
              <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light dark:text-white text-secondary">
                  Phòng tắm
                </h3>
                <LoadingSkeleton height="20px" width="40px"></LoadingSkeleton>
              </div>
              <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light dark:text-white text-secondary">
                  Diện tích
                </h3>
                <LoadingSkeleton height="20px" width="60px"></LoadingSkeleton>
                <span className="font-medium">
                  m<sup>2</sup>
                </span>
              </div>
              <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light dark:text-white text-secondary">
                  Loại chủ quyền
                </h3>
                <LoadingSkeleton height="20px" width="60px"></LoadingSkeleton>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-0">
              <div className="flex justify-between">
                <h3 className="text-base font-light dark:text-white text-secondary">
                  Giá bán
                </h3>
                <LoadingSkeleton height="20px" width="60px"></LoadingSkeleton>
              </div>
            </div>
          </div>
          <hr className="bg-gray-800 my-2 h-[2px] bg-opacity-20"></hr>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfoLoading;
