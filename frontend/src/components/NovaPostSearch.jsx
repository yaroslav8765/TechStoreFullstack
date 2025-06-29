import { useState, useEffect } from "react";
import NovaPostInputCity from "../ui/NovaPostInputCity";
import NovaPostInputDepartment from "../ui/NovaPostInputDepartment";

function NovaPostSearch({cityName,isCityFound,setIsCityFound,isDepartmentFound,setIsDepartmentFound, setCityName,departmentName, setDepartmentName, departmentFullName, setDepartmentFullname, cityFullName, setCityFullName}){

    const [isCityResultsShown, setCityIsResultShown] = useState(false);
    const [isDepartmentResultsShown, setIsDepartmentResultShown] = useState(false);
    const [cityFullNameUnderInput, setCityFullNameUnderInput] = useState("");
    const [debouncedCityName, setDebouncedCityName] = useState('');
    const [debouncedDepartmentName, setDebouncedDepartmentName] = useState('');
    const [citySearchResults, setCitySearchResults] = useState();
    const [departmentSearchResults, setDepartmentSearchResults] = useState();

    function showCityResults(){
        setCityIsResultShown(true);
    }

    function hideCityResults(){
        setCityIsResultShown(false);
    }

    function showDepartmentResults(){
        setIsDepartmentResultShown(true);
    }

    function hideDepartmentResults(){
        setIsDepartmentResultShown(false);
    }

    useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCityName(cityName);
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
    }, [cityName]);

    useEffect(() => {
    const fetchCity = async () => {
      if (debouncedCityName.length >= 1) {

        const novaPostKey = import.meta.env.NOVA_POST_API_KEY;

        const response = await fetch(`https://api.novaposhta.ua/v2.0/json/`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            apiKey: novaPostKey,
            modelName: 'AddressGeneral',
            calledMethod: 'getCities',
            methodProperties: {
              FindByString: debouncedCityName,
            },
          }),
        });

        if (response.ok) {
          const resData = await response.json();
          setCitySearchResults(resData);
          const firstCity = resData.data[0];
          if (firstCity) {
            setIsCityFound(true);
            setCityFullNameUnderInput(firstCity.Description);
            setCityFullName(
              `${firstCity.AreaDescription} обл. ${
                firstCity.SettlementTypeDescription === 'місто'
                  ? 'м.'
                  : firstCity.SettlementTypeDescription === 'село'
                  ? 'с.'
                  : 'смт.'
              } ${firstCity.Description}`
            );
          } else {
            setIsCityFound(false);
            setCityFullName('');
          }
        }
      } else {
        setIsCityFound(false);
        setCityFullName('');
      }
    };

    fetchCity();
  }, [debouncedCityName]);

    useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDepartmentName(departmentName);
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
    }, [departmentName]);

    useEffect(() => {
    const fetchDepartment = async () => {
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
                "FindByString": departmentName,
                "CityName" : cityFullNameUnderInput
            }
            })
        })
        if(response.ok){
            const resData = await response.json();
            setDepartmentSearchResults(resData);
            const firstDepartment = resData.data[0];
            console.log('Departments were recieved')
            if(firstDepartment){
                setDepartmentFullname(firstDepartment.Description)
                setIsDepartmentFound(true);
            }else{
                setIsDepartmentFound(false);
                setDepartmentFullname("");
            }
        } 
        if (debouncedDepartmentName.length === 0) {
            setIsDepartmentFound(false);
            setDepartmentFullname('');
        }
    };

    fetchDepartment();
  }, [debouncedDepartmentName, debouncedCityName]);


    async function handleInputChange(event) {
        const { name, value } = event.target;
        if (name === 'city_input') {
            setCityName(value);
            setIsCityFound(false);
            setCityFullName('');
        }
        if (name === "department_input") {
            setDepartmentName(value);
            setIsDepartmentFound(false);
            setDepartmentFullname('');
        };
    }
    
    return<div className="m-6">
        <NovaPostInputCity 
            placeholder="Enter city" 
            onChange={handleInputChange} 
            value={cityName} 
            setValue={setCityName} 
            name="city_input"
            showResults={showCityResults}
            hideResults={hideCityResults}
            isResultsShown={isCityResultsShown}
            setIsCityFound={setIsCityFound}
            isCityFound={isCityFound}
            cityFullName={cityFullName}
            setCityFullName={setCityFullName}
            results={citySearchResults}
        />

        <NovaPostInputDepartment
            placeholder="Enter department" 
            onChange={handleInputChange} 
            value={departmentName} 
            setValue={setDepartmentName} 
            name="department_input"
            showResults={showDepartmentResults}
            hideResults={hideDepartmentResults}
            isResultsShown={isDepartmentResultsShown}
            cityName={cityFullNameUnderInput}
            isCityFound={isCityFound}
            departmentFullName={departmentFullName}
            isDepartmentFound={isDepartmentFound}
            setDepartmentFullname={setDepartmentFullname}
            setIsDepartmentFound={setIsDepartmentFound}
            results={departmentSearchResults}
        />


        
    </div>

}

export default NovaPostSearch;