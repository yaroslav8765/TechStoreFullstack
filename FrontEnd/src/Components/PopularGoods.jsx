import React, {useState, useRef, useEffect} from "react";
import GoodsCard from "./GoodsCard";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Link } from "react-router-dom";
import listOfLinks from "../links";

const CARD_WIDTH = 265;

function PopularGoods({ title, category_link }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const containerRef = useRef();
  const [goodsCards, setGoodsCard] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);
  const [isRightButtonVisible, setIsRightButtonVisible] = useState(true);


  const updateButtonVisibility = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setIsLeftButtonVisible(scrollLeft > 0);
    setIsRightButtonVisible(scrollLeft + clientWidth < scrollWidth);
    setTimeout(updateButtonVisibility, 100);
  };

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= CARD_WIDTH;
    setTimeout(updateButtonVisibility, 100);
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += CARD_WIDTH;
    setTimeout(updateButtonVisibility, 100);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateButtonVisibility);
    window.addEventListener("resize", updateButtonVisibility);

    return () => {
      container.removeEventListener("scroll", updateButtonVisibility);
      window.removeEventListener("resize", updateButtonVisibility);
    };
  }, []);



  useEffect( () => {
    async function fetchGoods(){
      setIsFetching(true)
      console.log(`${API_URL}/goods/${category_link}`);
      const response = await fetch(`${API_URL}/goods/${category_link}`)
      const resData = await response.json();
      console.log(resData);
      setGoodsCard(resData);
      setTimeout(updateButtonVisibility, 100);
      setIsFetching(false)
    }
    fetchGoods();
  }, [])

  return (
    <>
      <div className="relative flex flex-col mt-4 rounded-xl">
      <h3 className="text-gray-700 text-4xl font-bold mb-6">{title}</h3>

      {isLeftButtonVisible &&<button
        onClick={scrollLeft} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition"
      >
        <ArrowCircleLeftIcon sx={{ color: "black" }} fontSize="large"/>
      </button>}

      {isRightButtonVisible && <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition"
      >
        <ArrowCircleRightIcon sx={{ color: "black" }} fontSize="large"/>
      </button>}

      {!isFetching && <div className="overflow-x-auto scrollbar-hide scroll-smooth" ref={containerRef}>
        <div
          className="flex gap-4  p-4 rounded-xl w-max min-w-full scroll-smooth"
        >
          {goodsCards &&
            goodsCards.map((item) => (
              <GoodsCard
                key={item.id}
                img={item.image_url}
                producName={item.name}
                price={item.price}
                rating={item.rating}
                voted={item.voted}
                old_price={item.old_price}
                product_link={item.id}
                category={item.category}
              />
            ))}
        </div>
      </div>
      }
      {isFetching && <div className="flex justify-center h-[440px]">
        <div className="flex items-center justify-center">
          <button type="button" className="inline-flex cursor-not-allowed items-center rounded-md bg-gray-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out" disabled="">
            <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>Processing…
            </button>
          </div>
        </div>
      }
      <div className="flex items-end justify-end mt-2">
        <Link className="text-white px-15 py-4 mr-11 font-bold text-xl rounded-xl gradient-btn-green"
          to={category_link}
        >
          See more
        </Link>
      </div>
    </div>
    </>
  );
}

export default PopularGoods;
