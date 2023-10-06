import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { propertyAPI } from "../api/propertyApi";
import useQuery from "../hooks/useQuery";
import LayoutHome from "../layouts/LayoutHome";
import PropertyList from "../modules/Property/list/PropertyList";

const PropertyListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useQuery();
  let searchQuery = query.get("query") || "";
  let landType = query.get("landType") || "";
  let page = query.get("page") || 0;

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await axios.get(
          propertyAPI.getProperties(landType, searchQuery, page)
        );
        const { data } = res;
        // console.log(data);
        setProperties(data);
        setIsLoading(false);
        setPageCount(data.totalPages);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchProperties();
  }, [searchQuery, landType, currentPage, searchParams]);

  const handlePageClick = (selected) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected.selected);
    setSearchParams((searchParams) => {
      searchParams.set("page", selected.selected);
      return searchParams;
    });
  };

  return (
    <LayoutHome>
      <div className="fixed flex items-center justify-start w-full border top-[82px] h-14 border-b-black dark:border-white dark:text-white border-t-black">
        <div>DropDownFilter</div>
      </div>
      <PropertyList
        className="lg:pt-16 pt-24"
        isLoading={isLoading}
        item={properties}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
      ></PropertyList>
    </LayoutHome>
  );
};

export default PropertyListPage;
