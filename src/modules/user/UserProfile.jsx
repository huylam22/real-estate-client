import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AvatarImageUpload from "../../components/image/AvatarImageUpload";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useQuery from "../../hooks/useQuery";
import PropertyList from "../Property/list/PropertyList";
import UserInfoInput from "./UserInfoInput";
import UserCard from "./parts/UserCard";
import Hamster from "../../components/loading/hamster/Hamster";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authLogOut } from "../../store/auth/auth-slice";

const UserProfile = ({ item }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [userProperties, setUserProperties] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const dispatch = useDispatch();
  const query = useQuery();
  let page = query.get("page") || 0;
  async function fecthUserProfile() {
    try {
      const res = await axiosPrivate.get(`api/v1/user/info`);
      // console.log(res);
      setUserProfile(res.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(authLogOut());
        toast.error(
          `Error ${error.response.status}. Your account might be logged in somewhere else or your session has expired. Please log in again.`
        );
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fecthUserProfile();
    }, 400);
  }, []);

  useEffect(() => {
    try {
      if (loading) return;
      async function fetchUserProperties() {
        const res = await axiosPrivate.get(
          `api/v1/properties/user/${userProfile?.id}?page=${page}&sort=id,desc`
        );
        // console.log(res);
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

  const handleReload = useCallback(() => {
    setLoading(true);
    fecthUserProfile();
    setShowEditAvatar(false);
  }, [userProfile]);

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="block text-white">
          <Hamster></Hamster>
          <button
            className="px-6 py-4 text-white rounded-lg bg-error"
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
    setShowEditProfile((prev) => !prev);
  };
  const handleEditAvatar = () => {
    setShowEditAvatar((prev) => !prev);
  };

  async function deleteProperty(id) {
    const res = await axiosPrivate.delete(`api/v1/delete/${id}`);
    fecthUserProfile();
  }
  return (
    <div className="w-full lg:max-w-[1440px] mx-auto">
      <div className="relative flex flex-col w-full min-w-0 mt-16 mb-6 break-words rounded-lg shadow-xl bg-inherit">
        <div className="px-6">
          <div className="mt-12 text-center">
            <UserCard item={userProfile}></UserCard>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-5">
          <button
            className="bg-purple max-w-[190px] w-full rounded-lg px-4 py-2 text-white mt-6 hover:bg-emerald-400"
            onClick={handleEditAvatar}
          >
            Edit your avatar
          </button>
          <button
            className="bg-green max-w-[190px] w-full rounded-lg px-4 py-2 text-white mt-6 hover:bg-emerald-400"
            onClick={handleEditProfile}
          >
            Edit your profile
          </button>
        </div>

        {showEditAvatar && (
          <>
            <div className="mx-auto flex flex-col w-full dark:bg-darkSecondary bg-whiteSoft max-w-[800px] mt-10 border dark:border-white border-primary p-6 rounded-2xl">
              <AvatarImageUpload reload={handleReload}></AvatarImageUpload>
              <button
                className="bg-error max-w-[400px] mx-auto w-full rounded-lg px-4 py-2 text-white hover:bg-emerald-400"
                onClick={handleEditAvatar}
              >
                Close Edit Avatar
              </button>
            </div>
          </>
        )}
        {showEditProfile && (
          <>
            <UserInfoInput></UserInfoInput>
          </>
        )}
        <div className="mt-6 text-center border-b border-blueGray-200"></div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-5 font-mono text-3xl font-bold tracking-widest underline dark:text-white text-primary">
            Your listing(s)
          </h1>
          <PropertyList
            deleteProperty={deleteProperty}
            edit={true}
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
