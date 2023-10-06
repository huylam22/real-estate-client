import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { propertyAPI } from "../../../api/propertyApi";
import useOnChange from "../../../hooks/useOnChange";
import useDebounce from "../../../hooks/useDebounce";
import Hamster from "../../../components/loading/hamster/hamster";
import SearchItem from "./SearchItem";
import IconX from "../../../components/icon/IconX";

const HeaderSearch = () => {
  const [showSearch, setShowSearch] = useState(false);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState(null);
  const handleChange = (e) => {
    setShowSearch(true);
    setLoading(true);
    setQuery(e.target.value);
  };
  const handleClick = () => {
    navigate(`/properties?query=${debounceQuery}`);
    setShowSearch(false);
  };

  const handleClickSuggest = () => {
    navigate(`/properties?query=vinhomes`);
    // setShowSearch(false);
  };

  useEffect(() => {
    if (debounceQuery) {
      async function fetchProperties() {
        try {
          const response = await axios.get(
            propertyAPI.getPropertiesSearch(debounceQuery)
          );
          console.log(response);
          setLoading(false);
          setSearchResults(response.data.content);
        } catch (error) {
          console.log(error);
        }
      }
      fetchProperties();
    } else {
      setShowSearch(false);
    }
  }, [debounceQuery]);

  return (
    <>
      <div className="absolute inset-y-0 flex items-center pl-3 ml-0 pointer-events-none">
        <svg
          className="z-10 w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search icon</span>
      </div>
      <input
        value={query}
        type="text"
        className={` lg:relative py-3 px-10 dark:bg-opacity-70 bg-inherit border-gray-400 border dark:border-gray-600 rounded-full bg-black mx-auto text-secondary dark:text-white w-full`}
        placeholder="Search..."
        onChange={handleChange}
        onFocus={() => setShowSearch(true)}
      />

      {showSearch && (
        <div className="search-results w-full lg:w-[843px] bg-white dark:bg-darkSecondary shadow-lg border border-primary absolute top-full left-0 z-50 translate-y-5 pb-6 rounded-3xl">
          <div className="flex items-center justify-between px-5 py-4 border rounded-b-none bg-graySoft dark:bg-darkSoft rounded-3xl">
            <h4
              className="pl-6 font-medium underline text-lg cursor-pointer dark:text-whiteSoft text-secondary text-md hover:text-green"
              onClick={handleClick}
            >
              See all results
            </h4>
            <button
              onClick={() => setShowSearch(false)}
              className="flex items-center justify-center w-[72px] h-10 rounded-xl bg-error bg-opacity-20 text-error"
            >
              <IconX></IconX>
            </button>
          </div>

          <div className="py-2 px-6 pb-0 overflow-y-auto scroll-hidden max-h-[350px]">
            <div className="flex flex-col mb-8 overflow-hidden gap-y-2">
              {loading ? (
                <>
                  <h3 className="mb-1 text-lg dark:text-white font-semibold">
                    Suggested Search
                  </h3>

                  <p
                    onClick={handleClickSuggest}
                    className="hover:text-green cursor-pointer font-semibold tracking-wider dark:text-text4 text-text2"
                  >
                    Vinhomes
                  </p>

                  <div className="mx-auto">
                    <Hamster></Hamster>
                  </div>
                </>
              ) : searchResults?.length > 0 ? (
                searchResults.map((item) => (
                  <SearchItem
                    searchValue={debounceQuery}
                    key={item.id}
                    item={item}
                  ></SearchItem>
                ))
              ) : (
                <div className="text-error text-start">No Property Found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSearch;
