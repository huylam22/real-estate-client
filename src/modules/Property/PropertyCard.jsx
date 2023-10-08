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
import ModalImage from "../../components/modal/ModalImage";
const PropertyCard = ({ item, edit = false, deleteProperty = (id) => {} }) => {
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

  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const onClose = () => {
    setOpenModal(false);
  };
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
            className="object-cover h-[250px] w-full mb-5 transition-all rounded-lg shadow-sm hover:shadow-neutral-300"
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
              className="z-10 w-full px-4 py-2 mt-3 text-white rounded-lg bg-purple hover:bg-violet-400"
            >
              Edit
            </button>
            <button
              className="z-10 w-full px-4 py-2 mt-3 text-white rounded-lg bg-green hover:bg-violet-400"
              onClick={handleClickNavigateImage}
            >
              Images
            </button>
            <button
              className="z-10 w-full px-4 py-2 mt-3 text-white rounded-lg bg-error hover:bg-violet-400"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Delete
            </button>
            <ModalImage isOpen={openModal} onClose={onClose}>
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-7 dark:from-gray-900 dark:to-gray-600 dark:bg-gradient-to-r">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h2 className="text-4xl font-semibold text-center text-white">
                  Are you sure?
                </h2>
                <p className="mb-4 text-lg text-center text-text4">
                  Do you really want to delete this listing, this process cannot
                  be undone!
                </p>
                <div className="flex gap-4">
                  <button
                    className="px-6 py-2 text-white rounded-lg bg-error hover:bg-violet-400"
                    onClick={() => {
                      deleteProperty(item.id);
                      setOpenModal(false);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="px-6 py-2 text-white bg-gray-400 rounded-lg hover:bg-violet-400"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </ModalImage>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyCard;
