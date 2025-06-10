import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuthToken, checkAuthLoader,removeToken } from "../../util/auth.js"
import GoodsPicturesSlider from '../components/GoodsPictiuresSlider.jsx';
import CrititcalErrorWindow from '../ui/CrititcalErrorWindow.jsx';
import LoadingAnimation from '../components/LoadingAnimation.jsx';
import MainGoodInfo from '../components/MainGoodInfo.jsx';

function GoodsInfo(){
    const { category, id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [goodsData, setGoodsData] = useState([]);
    useEffect(() => {
        async function loadGoodsData() {
            setIsLoading(true)
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(API_URL + "/goods/" + category + "/" + id, {
                  method: "GET",
                  headers: {
                    "Content-type": "application/json",
                  }
                });
            
                const resData = await response.json();
                if (response.ok) {
                    setGoodsData(resData);
                    console.log(resData);
                } else {

                }
                setIsLoading(false);
        }
        loadGoodsData();
    },[])

return (
  <div className={`flex items-center max-w-[1200px] mx-auto w-full min-h-[70vh]`}>
    {isError && <CrititcalErrorWindow message={errorMessage} />}
    {isLoading ? (
      <LoadingAnimation className="flex justify-center items-center" />
    ) : (
      <div className='flex m-2 gap-4 w-full'>
        <div className="max-h-[750px] max-w-[480px]  rounded-xl shadow-md flex flex-col p-2 ">
            {goodsData[0] && (
                <GoodsPicturesSlider mainPicture={goodsData[0].image_url} pictures={goodsData[2]} />
            )}
        </div>
        <div className='flex flex-col gap-4 w-full'>
          {goodsData[0] && (
            <MainGoodInfo  
            title={goodsData[0].name}
            isAvailable={goodsData[0].quantity > 0 ? true : false}
            rating={goodsData[0].rating}
            voted={goodsData[0].voted}
            id={goodsData[0].id}
            />
          )}
        </div>
      </div>
    )}
  </div>
);

}

export default GoodsInfo;