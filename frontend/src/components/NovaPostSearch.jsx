import { useState } from "react";
import NovaPostInputCity from "../ui/NovaPostInputCity";

function NovaPostSearch(){
    const [cityName, setCityName] = useState("");
    const [isResultsShown, setIsResultShown] = useState(false);

    function showResults(){
        setIsResultShown(true);
    }

    function hideResults(){
        setIsResultShown(false);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(value);
        if (name === "city_input") setCityName(value);
    }
    
    return<div className="m-6">
        <NovaPostInputCity 
            placeholder="Enter city" 
            onChange={handleInputChange} 
            value={cityName} 
            setValue={setCityName} 
            name="city_input"
            showResults={showResults}
            hideResults={hideResults}
            isResultsShown={isResultsShown}
        />
            
    </div>
}

export default NovaPostSearch;