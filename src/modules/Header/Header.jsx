import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import UserDropDown from "../user/UserDropDown";
import HeaderSearch from "./parts/HeaderSearch";
import ToggleMobileMenu from "./parts/ToggleMobileMenu";
import useDarkMode from "../../hooks/darkmode/useDarkMode";
import { toggleDarkMode } from "../../store/globalSlice";
import ButtonDarkMode from "../../components/button/ButtonDarkMode";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Properties",
      link: "/properties",
    },
  ];

  const navlinkClass =
    "text-white font-medium w-full rounded-lg lg:w-auto mb-2 lg:mb-0 lg:mr-2 lg:ml-0 lg:mt-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700";
  return (
    <>
      <nav className="fixed inset-0 z-50 bg-black dark:bg-black dark:bg-opacity-80 lg:sticky h-max backdrop-blur-md bg-opacity-80 ">
        <div className="flex flex-wrap items-center justify-between p-4 mx-auto">
          <div className="flex gap-x-6">
            <Link to="/" className="flex items-center">
              <img
                src="/logo-bright.png"
                className="h-8 mr-3"
                alt="Home Production Logo"
              />
            </Link>
            <div className="flex">
              <div className="relative hidden lg:block">
                <HeaderSearch></HeaderSearch>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <ButtonDarkMode></ButtonDarkMode>
            <ToggleMobileMenu
              toggleMobileMenu={toggleMobileMenu}
            ></ToggleMobileMenu>
          </div>

          <div
            className={`items-center justify-between ${
              isMobileMenuOpen ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:order-1`}
          >
            <div className={`relative mt-3 lg:hidden`}>
              <HeaderSearch></HeaderSearch>
            </div>

            <div className="flex flex-col p-4 mt-4 font-medium bg-gray-800 border border-gray-100 rounded-lg lg:p-0 lg:mt-0 lg:border-none lg:gap-x-3 lg:flex-row lg:bg-inherit dark:border-gray-700">
              {navLinks?.map((item) => (
                <NavLink
                  to={item.link}
                  key={item.title}
                  className={({ isActive }) =>
                    isActive
                      ? `${navlinkClass} bg-green text-inherit`
                      : `${navlinkClass} `
                  }
                >
                  <span className="block py-2 pl-3 pr-4 text-white rounded lg:px-5 lg:py-3 lg:hover:bg-transparent lg:p-0 lg:dark:hover:text-green dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    {item.title}
                  </span>
                </NavLink>
              ))}
              <button
                id="btn"
                className="px-4 py-2 button-effect"
                onClick={() => {
                  navigate("/add-property");
                }}
              >
                Post Your Property
              </button>
            </div>

            <div>
              {user ? (
                <UserDropDown
                  username={`${user.firstname} ${user.lastname}`}
                  isDropdownOpen={isDropdownOpen}
                  toggleDropdown={toggleDropdown}
                ></UserDropDown>
              ) : (
                <Button
                  className="mx-5 mt-3 lg:mt-0"
                  kind="secondary"
                  href="/sign-in"
                >
                  Sign In
                </Button>
              )}
            </div>

            <ButtonDarkMode isMobile={true}></ButtonDarkMode>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
