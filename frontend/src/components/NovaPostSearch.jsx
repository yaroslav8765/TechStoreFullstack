import { useState } from "react";
import NovaPostInputCity from "../ui/NovaPostInputCity";
import NovaPostInputDepartment from "../ui/NovaPostInputDepartment";

function NovaPostSearch({cityName, setCityName,departmentName, setDepartmentName}){

    const [isCityResultsShown, setCityIsResultShown] = useState(false);
    const [isDepartmentResultsShown, setIsDepartmentResultShown] = useState(false);

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

    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(value);
        if (name === "city_input") setCityName(value);
        if (name === "department_input") setDepartmentName(value);
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
            cityName={cityName}
        />


        
    </div>

}

export default NovaPostSearch;