import React from "react";
import GoodsCard from "./GoodsCard";

function PopularGoods({ goodsCards, title }) {
  return (
    <div className="flex flex-col my-4">
      <h3 className="text-gray-700 text-4xl font-bold mb-6">{title}</h3>
      <div className="flex flex-wrap justify-between gap-4">
        {goodsCards && goodsCards.map((item, index) => (
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
  );
}

export default PopularGoods;
