import React from "react";
import { useDispatch } from "react-redux";
import { authLogOut } from "../../store/auth/auth-slice";
import { useNavigate, Link } from "react-router-dom";

const UserDropDown = ({
  toggleDropdown = () => {},
  isDropdownOpen,
  username,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="p-3">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between py-2 pl-3 pr-4 ml-3 text-white rounded hover:bg-gray-100 hover:shadow-lg md:hover:bg-transparent md:border-0 md:hover:text-green md:p-0 md:w-auto dark:text-white md:dark:hover:text-green dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
      >
        {username}
        <svg
          className={`w-2.5 h-2.5 ml-2.5 ${
            isDropdownOpen ? "transform rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 p-2 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg lg:right-1 lg:top-16 dark:border dark:border-white w-44 dark:bg-black dark:bg-opacity-80 dark:shadow-2xl">
          <ul
            onClick={() => {
              navigate("/user-profile");
            }}
            className="py-2 text-sm text-gray-700 dark:text-gray-400"
            aria-labelledby="dropdownNavbarLink"
          >
            <li>
              <Link
                to="/user-profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <a
              onClick={() => {
                dispatch(authLogOut());
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropDown;
