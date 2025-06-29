import { useEffect, useState, useRef } from "react";
import InputSearchResult from "./InputSearchResult";



function NovaPostInputCity({placeholder, results,onChange, value,setValue, name,showResults, hideResults,isResultsShown,isCityFound ,setIsCityFound, cityFullName, setCityFullName}){
  const containerRef = useRef(null);

  function setInput(text){
    setValue(text);
    hideResults();
  }

  


useEffect(() => {
  function handleClickOutside(event) {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      hideResults();
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


    return <div className=" mt-4">
      <p className={`text-lg text-gray-600 ${isCityFound?"text-green-600":""}`}>Enter city name*</p>
        <input
          className={`bg-gray-50 h-[35px] rounded-md border border-gray-500 pl-2 
              focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none text-gray-600 text-lg w-full `}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          onClick={showResults}
          autoComplete="off"
        />
      <p className="text-gray-400 text-sm max-w-[200px]">{cityFullName}</p>
      <div ref={containerRef} className="max-h-[200px] overflow-y-auto overflow-x-hidden scroll-smooth  absolute z-50">
        {isResultsShown && Array.isArray(results?.data) &&
          results.data.map((city, index) => (
            <InputSearchResult
              key={index}
              value={`${city.AreaDescription} обл. ${city.SettlementTypeDescription === "місто" ? "м." : city.SettlementTypeDescription === "село" ? "с." : "смт."} ${city.Description}`}
              onClick={() =>{
                setInput(
                  `${city.Description}`
                );
                setCityFullName(`${city.AreaDescription} обл. ${city.SettlementTypeDescription === "місто" ? "м." : city.SettlementTypeDescription === "село" ? "с." : "смт."} ${city.Description}`);
                setIsCityFound(true);
              }
              }
            />
        ))}
      </div>
    </div>
}

export default NovaPostInputCity;