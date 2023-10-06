import React from "react";
import PropertyCard from "../PropertyCard";
import PropertyCardLoading from "../PropertyCardLoading";

import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";

const PropertyList = ({
  isLoading,
  handlePageClick,
  item,
  pageCount,
  className = "",
}) => {
  return (
    <>
      <div
        className={`lg:min-h-screen lg:mt-0 ${className} max-w-[1440px] mx-auto`}
      >
        {isLoading && (
          <div className="flex mt-20 flex-col gap-2 md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6">
            {[...Array(8)].map((_, index) => (
              <PropertyCardLoading key={index} />
            ))}
          </div>
        )}
        <div className="lg:p-5 p-0">
          {item && (
            <h1 className="text-secondary dark:text-graySoft mb-4">
              Showing <strong>{item?.numberOfElements} </strong> of all{" "}
              <strong>{item?.totalElements}</strong> results
            </h1>
          )}

          <div className="flex flex-col gap-2 md:grid md:grid-cols-2 xl:grid xl:grid-cols-4 xl:gap-x-4 xl:gap-y-6 lg:grid lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6">
            {item?.content.length > 0 &&
              item.content.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <PropertyCard key={item.id} item={item}></PropertyCard>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName="pagination dark:bg-darkSoft bg-darkSoft w-fit rounded-full mb-4 text-white  mx-auto flex justify-center items-center gap-2 mt-2"
        activeClassName="bg-green font-bold dark:bg-primaryDark py-2 px-3 rounded-lg"
        previousClassName="cursor-pointer rounded-full hover:bg-gray-200 hover:text-gray-700 px-4 py-2"
        nextClassName="cursor-pointer rounded-full hover:bg-gray-200 hover:text-gray-700 px-4 py-2"
        breakClassName="cursor-pointer rounded-full hover:bg-gray-200 hover:text-gray-700 px-4 py-2"
        disabledClassName="opacity-50 cursor-not-allowed rounded-full px-4 py-2"
      />
    </>
  );
};

export default PropertyList;
