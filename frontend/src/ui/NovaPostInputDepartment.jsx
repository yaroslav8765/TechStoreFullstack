import { useEffect, useState, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import InputSearchResult from "./InputSearchResult";

function NovaPostInputDepartment({placeholder, onChange, value,setValue, name,showResults, hideResults,isResultsShown, cityName}){
  const containerRef = useRef(null);
  const [results, setResults] = useState([]);
  const [cityFullName, setCityFullName] = useState("");
  
  function setInput(text){
    setValue(text);
    hideResults();
  }

  useEffect(()=>{
    async function getCities() {
      if(cityName !== ""){
        const novaPostKey = import.meta.env.NOVA_POST_API_KEY;
        const response = await fetch(`https://api.novaposhta.ua/v2.0/json/`,{
            method: "POST",
            headers: {
            "Content-type":"application/json",
            },
            body: JSON.stringify({
            apiKey: novaPostKey,
            modelName: "AddressGeneral",
            calledMethod: "getWarehouses",
            methodProperties: {
                "FindByString": value,
                "CityName" : cityName
            }
            })
        })
        if(response.ok){
            const resData = await response.json();
            console.log(resData);
            setResults(resData);
        }
        }
    }
    getCities();
  },[value, cityName])

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


    return <div className="max-w-[220px]">
      <input
        className={`bg-gray-50 h-[35px] rounded-md border border-gray-500 pl-2 
             focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300 outline-none text-gray-600 text-lg w-full `}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        onClick={showResults}
      />
      <p className="text-gray-400 text-sm">{cityFullName}</p>
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
                setCityFullName(`${city.Description}`)
              }
              }
            />
        ))}
      </div>
    </div>
}
export default NovaPostInputDepartment;