import React from "react";
import { useNavigate } from "react-router-dom";
import { propertyAPI } from "../../../api/propertyApi";
import Highlighter from "react-highlight-words";

const SearchItem = ({ item, searchValue }) => {
  const navigate = useNavigate();
  const handleClickNavigate = () => {
    navigate(`/properties/${item.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="flex items-center px-5 py-2 cursor-pointer gap-x-5 hover:shadow-lg rounded-2xl dark:hover:bg-gray-700 hover:bg-gray-100"
      onClick={handleClickNavigate}
    >
      <img
        src={
          item.propertyCoverPaths.length > 0
            ? propertyAPI.propertyImage(item.propertyCoverPaths[0])
            : propertyAPI.defaultImage
        }
        className="w-[50px] h-[50px] rounded-lg object-cover"
      />

      <div className="flex-1 dark:text-white text-sm">
        <Highlighter
          highlightClassName="text-error font-semibold bg-transparent"
          searchWords={[searchValue]}
          autoEscape={true}
          textToHighlight={item.propertyPostingStatus}
        />
        <div className="flex gap-x-5">
          <div className="flex lg:flex-row flex-col lg:gap-x-1 items-center justify-center">
            <p className="text-text3 ">Ngày Đăng: </p>
            <p className="text-text3 ">{item.createdDate}</p>
          </div>

          <p className="text-text3">
            {item.districtName}, {item.provinceName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
