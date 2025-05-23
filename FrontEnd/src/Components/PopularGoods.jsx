import React, {useState, useRef, useEffect} from "react";
import GoodsCard from "./GoodsCard";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Link } from "react-router-dom";
import listOfLinks from "../links";

const CARD_WIDTH = 240;

function PopularGoods({ title, category_link }) {
  const containerRef = useRef();
  const [goodsCards, setGoodsCard] = useState([]);
  function scrollLeft(){
    containerRef.current.scrollLeft -= CARD_WIDTH;
  }

  function scrollRight(){
    containerRef.current.scrollLeft += CARD_WIDTH;
  }

  useEffect( () => {
    async function fetchGoods(){
      const response = await fetch(`${listOfLinks.main_api}goods/${category_link}`)
      const resData = await response.json();
      console.log(resData);
      setGoodsCard(resData);
    }
    fetchGoods();
  }, [])

  return (
    <div className="relative flex flex-col mt-4 rounded-xl">
      <h3 className="text-gray-700 text-4xl font-bold mb-6">{title}</h3>

      <button
        onClick={scrollLeft} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition"
      >
        <ArrowCircleLeftIcon sx={{ color: "black" }} fontSize="large"/>
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition"
      >
        <ArrowCircleRightIcon sx={{ color: "black" }} fontSize="large"/>
      </button>

      <div className="overflow-x-auto scrollbar-hide scroll-smooth" ref={containerRef}>
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
                product_link={item.product_link}
              />
            ))}
        </div>
      </div>

      <div className="flex items-end justify-end mt-2">
        <Link className="text-white px-15 py-4 mr-11 font-bold text-xl rounded-xl bg-[linear-gradient(300deg,_#0f52ba,_#00c2c2,_#2fe0a2)] 
          bg-[length:180%_180%] animate-gradient 
          hover:bg-[linear-gradient(300deg,_#1a75ff,_#00d4b4,_#4fffcf)] 
          transition-all duration-300"
          to={category_link}
        >
          See more
        </Link>
      </div>
    </div>
  );
}

export default PopularGoods;
