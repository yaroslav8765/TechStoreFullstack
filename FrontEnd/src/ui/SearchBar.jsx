import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SingleSearchBarResult from "./SingleSearchBarResult";
import listOfLinks from "../links";

function SearchBar() {
  const [usersPrompt, setUsersPrompt] = useState("");
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [resData, setResData] = useState([]);

  async function handleClickOnSearch() {
    setIsRequestActive(true);
    const response = await fetch(`http://127.0.0.1:8000/goods/bestsellers`);
    const data = await response.json();
    setResData(data);
  }

  async function handleChange(event) {
    setUsersPrompt(event.target.value);
    const response = await fetch(`${listOfLinks.search}?request=${event.target.value}`);
    const data = await response.json();
    setResData(data);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[440px] mx-auto z-50">
      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 h-[45px] max-w-[400px] w-full mx-2 z-50 shadow-md">
        <input
          className="flex-grow bg-transparent text-black placeholder-gray-500 focus:outline-none"
          name="title"
          placeholder="Search products..."
          onChange={handleChange}
          value={usersPrompt}
          onClick={handleClickOnSearch}
        />
        <SearchIcon
          sx={{ fontSize: "30px" }}
          className="text-gray-700 w-[40px] h-[40px] rounded-md hover:text-black transition-bg duration-200"
        />
      </div>

      {/* Search results */}
      {isRequestActive && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsRequestActive(false)}
          ></div>

          <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[400px] max-h-[70vh] overflow-y-auto bg-white rounded-xl shadow-lg z-50 space-y-4 scrollbar-hide scroll-smooth">
            {Array.isArray(resData) ? (
              resData.length > 0 ? (
                resData.map((item) => (
                  <SingleSearchBarResult
                    key={item.id}
                    img={item.image_url}
                    title={item.name}
                    price={item.price}
                    old_price={item.old_price}
                    category={item.category}
                    id={item.id}
                    description={item.description}
                  />
                ))
              ) : (
                <p className="text-gray-700 text-center py-4">No results</p>
              )
            ) : (
              <p className="text-red-500">Error</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchBar;
