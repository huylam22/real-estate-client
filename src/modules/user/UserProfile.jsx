import React, { useEffect, useState } from "react";
import { propertyAPI } from "../../api/propertyApi";
import Card from "./parts/Card";
import PropertyList from "../Property/list/PropertyList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserCard from "./parts/UserCard";
import { useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { useSearchParams } from "react-router-dom";

const UserProfile = ({ item }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [userProperties, setUserProperties] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showEditProfile, setShowEditProfile] = useState(false);

  const query = useQuery();
  let page = query.get("page") || 0;
  async function fecthUserProfile() {
    const res = await axiosPrivate.get(`api/v1/user/info`);
    // console.log(res);
    setUserProfile(res.data);
    setLoading(false);
  }

  useEffect(() => {
    try {
      fecthUserProfile();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      if (loading) return;
      async function fetchUserProperties() {
        const res = await axiosPrivate.get(
          `api/v1/properties/user/${userProfile?.id}?page=${page}`
        );
        console.log(res);
        setUserProperties(res.data);
        setPageCount(res.data.totalPages);
      }
      fetchUserProperties();
    } catch (e) {
      console.log(e);
    }
  }, [userProfile, currentPage]);
  const handleReloadClick = () => {
    setLoading(true);
    fecthUserProfile(); // Call the function to fetch user profile data again
  };

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="block text-white">
          <button
            className="bg-error text-white rounded-lg px-6 py-4"
            onClick={handleReloadClick}
          >
            Reload User Profile
          </button>
        </div>
      </div>
    );
  }
  const handlePageClick = (selected) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected.selected);
    setSearchParams((searchParams) => {
      searchParams.set("page", selected.selected);
      return searchParams;
    });
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };
  return (
    <div className="w-full lg:max-w-[1440px] px-4 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-inherit w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="text-center mt-12">
            <UserCard item={userProfile}></UserCard>
          </div>
        </div>
        <button
          className="bg-green max-w-[400px] mx-auto w-full rounded-lg px-4 py-2 text-white mt-6 hover:bg-emerald-400"
          onClick={handleEditProfile}
        >
          Edit your profile
        </button>
        <div className="mt-6 border-b border-blueGray-200 text-center"></div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="dark:text-white text-primary text-3xl font-bold tracking-widest font-mono mt-5 underline">
            Your listing(s)
          </h1>
          <PropertyList
            item={userProperties}
            className="pt-0"
            isLoading={loading}
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          ></PropertyList>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
