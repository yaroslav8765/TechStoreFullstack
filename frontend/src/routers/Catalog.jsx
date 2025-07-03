import { useEffect, useState } from "react";
import LoadingAnimation from "../components/LoadingAnimation";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

function Catalog(){
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        async function getCategories() {
            setIsLoading(true);
            const response = await fetch("http://127.0.0.1:8000/goods/");
            if(response.ok){
                const resData = await response.json();
                setCategories(resData);
                console.log(resData);
            }
            setIsLoading(false);
        }
        getCategories();
    },[])
    return<div> 
        <div className=" gap-4 max-w-[1200px] mx-auto mt-4 w-full min-h-[70vh]">
            <h2 className="text-gray-900 text-4xl font-bold m-4">Goods categories</h2>
            <div className="flex items-start">
            {isLoading && <LoadingAnimation />}
            {categories && categories.map((category, index) => (
            <div 
                className="flex items-center justify-center min-h-[100px] w-[300px]
                px-6 py-3 m-3
                rounded-xl
                hover:bg-gray-200
                text-gray-800 font-semibold text-2xl
                shadow-md hover:shadow-lg
                transition-all duration-300
                cursor-pointer border border-gray-200"
                key={index}
                onClick={() => navigate(`/${category}`)}
                >
                <p>
                    {category}
                </p>
            </div>
            ))}
            </div>
        </div>
    </div>
}

export default Catalog;