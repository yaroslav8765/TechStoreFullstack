import React, {useState, useRef} from "react";
import GoodsCard from "./GoodsCard";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const CARD_WIDTH = 240;

function PopularGoods({ goodsCards, title }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();

  function scrollLeft(){
    containerRef.current.scrollLeft -= CARD_WIDTH;
  }

  function scrollRight(){
    containerRef.current.scrollLeft += CARD_WIDTH;
  }
  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;

    setScrollPosition(newScrollPosition);
    console.log(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };


  return (
    <div className="relative flex flex-col mt-4 rounded-xl">
      <h3 className="text-gray-700 text-4xl font-bold mb-6">{title}</h3>

      <button
        onClick={scrollLeft} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
      >
        <ArrowCircleLeftIcon sx={{ color: "black" }} fontSize="large"/>
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
      >
        <ArrowCircleRightIcon sx={{ color: "black" }} fontSize="large"/>
      </button>

      <div className="overflow-x-auto scrollbar-hide scroll-smooth" ref={containerRef}>
        <div
          className="flex gap-4 bg-gray-50 p-4 rounded-xl w-max min-w-full scroll-smooth"
        >
          {goodsCards &&
            goodsCards.map((item) => (
              <GoodsCard
                key={item.id}
                img="https://pm1.aminoapps.com/7954/ed76c65c9eadc327e24b378f3b65aa4fa4fc2749r1-479-512v2_00.jpg"
                producName={item.name}
                price={item.price}
                rating={item.rating}
                voted={item.voted}
              />
            ))}
        </div>
      </div>

      <div className="flex items-end justify-end mt-2">
        <button className="text-white px-15 py-4 mr-11 font-bold text-xl rounded-xl bg-[linear-gradient(300deg,_#0f52ba,_#00c2c2,_#2fe0a2)] 
          bg-[length:180%_180%] animate-gradient 
          hover:bg-[linear-gradient(300deg,_#1a75ff,_#00d4b4,_#4fffcf)] 
          transition-all duration-300"
        >
          See more
        </button>
      </div>
    </div>
  );
}

export default PopularGoods;
