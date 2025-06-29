import { useEffect, useState, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import InputSearchResult from "./InputSearchResult";

function NovaPostInputDepartment({placeholder, onChange, value,setValue, name,showResults, hideResults,isResultsShown, cityName, isCityFound, departmentFullName, isDepartmentFound,setIsDepartmentFound, setDepartmentFullname,results}){
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


    return <div className={`max-w-[220px] mt-4 block ` }>
      <p className={`text-lg text-gray-600 ${isDepartmentFound? "text-green-600" : ""}`}>Enter department name*</p>
      <input
        className={`bg-gray-50 h-[35px] rounded-md border border-gray-500 pl-2 
             focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none text-gray-600 text-lg w-full 
             ${isCityFound ? "" : "bg-gray-200"}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        onClick={showResults}
        disabled={isCityFound ? false : true}
        autoComplete="off"
      />
      <p className="text-gray-400 text-sm">{departmentFullName}</p>
      <div ref={containerRef} className="max-h-[200px] overflow-y-auto scroll-smooth max-w-[220px] absolute z-50">
        {isResultsShown && Array.isArray(results?.data) &&
          results.data.map((city, index) => (
            <InputSearchResult
              key={index}
              value={`${city.Description}`}
              onClick={() =>{
                setInput(
                  `${city.Description}`
                );
                setDepartmentFullname(`${city.Description}`);
                setIsDepartmentFound(true);
              }
              }
            />
        ))}
      </div>
    </div>
}
export default NovaPostInputDepartment;