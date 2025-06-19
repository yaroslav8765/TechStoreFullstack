import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getAuthToken, checkAuthLoader,removeToken } from "../../util/auth.js"
import GoodsPicturesSlider from '../components/GoodsPictiuresSlider.jsx';
import CrititcalErrorWindow from '../ui/CrititcalErrorWindow.jsx';
import LoadingAnimation from '../components/LoadingAnimation.jsx';
import MainGoodInfo from '../components/MainGoodInfo.jsx';
import GoodsPrice from '../components/GoodsPrice.jsx';
import RelativeGoods from '../components/RelativeGoods.jsx';
import SmallReviewsComponent from '../components/SmallReviewsComponent.jsx';
import Description from '../components/Description.jsx';
import CharacteristicsTable from '../components/CharacteristicsTable.jsx';
import BigReviewsComponent from '../components/BigReviewsComponent.jsx';

function GoodsInfo(){
    const { category, id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [goodsData, setGoodsData] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const targetRef = useRef(null);

    function expandFunction(){
      setIsExpanded(!isExpanded)
    }

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

                    const authResult = checkAuthLoader();
                    if (authResult) return authResult;
                    const token = getAuthToken();
                    const response2 = await fetch(`${API_URL}/user/add-good-to-recently-watched?good_id=${resData[0].id}`,{
                      method:"POST",
                      headers: {
                      "Content-type":"application/json",
                      "Authorization": `Bearer ${token}`
                      }
                    })
                } else {

                }
                setIsLoading(false);
        }
        loadGoodsData();
    },[category,id])




    function goToReviewsSection(){
      targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

return (
  <div className={`flex items-center justify-center max-w-[1200px] mx-auto mt-4 w-full min-h-[70vh]`}>
    {isError && <CrititcalErrorWindow message={errorMessage} />}
    {isLoading ? (
      <LoadingAnimation className="flex justify-center items-center" />
    ) : (
      <div className='flex flex-col items-start justify-start max-w-[1200px] gap-4'>
        <div className='flex justify-between gap-4 w-full'>
          <div className="  rounded-xl shadow-md flex flex-col ">
              {goodsData[0] && (
                  <GoodsPicturesSlider mainPicture={goodsData[0].image_url} pictures={goodsData[2]} />
              )}
          </div>
          <div className='flex flex-col justify-between w-full max-w-[700px]'>
            {goodsData[0] && (
              <MainGoodInfo  
              title={goodsData[0].name}
              isAvailable={goodsData[0].quantity > 0 ? true : false}
              rating={goodsData[0].rating}
              voted={goodsData[0].voted}
              id={goodsData[0].id}
              goToReviewsSection={goToReviewsSection}
              />
            )}
            {goodsData[3] && (
              <RelativeGoods  
              info={goodsData[3]}
              category={goodsData[0].category}
              />
            )}
            {goodsData[0] && (
              <GoodsPrice  
              oldPrice={goodsData[0].old_price}
              newPrice={goodsData[0].price}
              categoty={goodsData[0].category}
              id={goodsData[0].id}
              />
            )}
            {goodsData[0] && (
              <SmallReviewsComponent id={goodsData[0].id} goToReviewsSection={goToReviewsSection}/>
            )}
          </div>
        </div>
        <div className='w-full flex justify-between max-w-[1200px] gap-4'>
        {goodsData[1] && <CharacteristicsTable characteristics={goodsData[1]} expandFunction={expandFunction} isExpanded={isExpanded}/>}
        {goodsData[0] && <Description Description={goodsData[0].description} isExpanded={isExpanded} />}
        </div>
        {goodsData[0] && (
          <div ref={targetRef} className='flex w-full'>
          <BigReviewsComponent id={goodsData[0].id} voted={goodsData[0].voted} />
          </div>
        )}
      </div>
    )}
  </div>
);

}

export default GoodsInfo;