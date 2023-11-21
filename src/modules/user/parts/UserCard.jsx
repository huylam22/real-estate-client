import React from "react";
import CardWrapper from "./Card";
import { propertyAPI } from "../../../api/propertyApi";

const UserCard = ({ item }) => {
  return (
    <>
      <CardWrapper>
        <div className="flex items-center gap-x-10">
          <img
            alt={item.username}
            src={
              item.avatar_url
                ? propertyAPI.propertyImage(item.avatar_url)
                : "https://cdn.dribbble.com/userupload/10561404/file/original-e8dbec299febee196a76dd3a25f32ef2.png?resize=1504x1129"
            }
            loading="lazy"
            className="object-cover ml-2 border-none rounded-full shadow-xl lg:w-32 h-28 w-28 lg:h-32"
          />
          <div className="flex flex-col items-center justify-center gap-2 p-3 mr-4 text-center">
            <span className="block text-base font-bold tracking-widest uppercase lg:text-3xl text-blueGray-600">
              {item.firstname} {item.lastname}
            </span>
            <div className="flex items-center pb-2 border-b gap-x-2 border-blueGray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 lg:w-7 lg:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>

              <span className="block text-xs font-semibold tracking-widest uppercase lg:text-sm text-blueGray-400">
                Verified
              </span>
            </div>
            <span className="font-light text-whiteSoft">
              <strong className="font-bold">Contact:</strong> {item.username}
            </span>
          </div>
        </div>
      </CardWrapper>
    </>
  );
};

export default UserCard;
