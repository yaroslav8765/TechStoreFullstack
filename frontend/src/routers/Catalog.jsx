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
    return <div className="flex flex-col gap-4 max-w-[1200px] mx-auto mt-4 w-full min-h-[70vh]">
        {isLoading && <LoadingAnimation />}
{categories && categories.map((category, index) => (
  <p
    key={index}
    onClick={() => navigate(`/${category}`)}
    className="
      inline-block
      px-6 py-3 m-3
      rounded-xl
      bg-blue-100 hover:bg-blue-200
      text-blue-800 font-semibold text-lg
      shadow-md hover:shadow-lg
      transition-all duration-300
      cursor-pointer
    "
    >
    {category}
  </p>
))}



    </div>
}

export default Catalog;