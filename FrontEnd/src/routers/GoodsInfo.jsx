import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuthToken, checkAuthLoader,removeToken } from "../../util/auth.js"
import GoodsPicturesSlider from '../components/GoodsPictiuresSlider.jsx';
import CrititcalErrorWindow from '../ui/CrititcalErrorWindow.jsx';
import LoadingAnimation from '../components/LoadingAnimation.jsx';
import SmallImage from '../ui/SmallImage.jsx';

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
      <div className='flex m-2 '>
        <div className="max-h-[900px]  max-w-[450px] w-full rounded-xl shadow-md flex flex-col p-2">
            {goodsData[0] && (
                <GoodsPicturesSlider mainPicture={goodsData[0].image_url} />
            )}
        </div>
        <div >

        </div>
      </div>
    )}
  </div>
);

}

export default GoodsInfo;