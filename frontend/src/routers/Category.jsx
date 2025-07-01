import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import GoodsCard from '../components/GoodsCard';
import InputSearchResult from '../ui/InputSearchResult';

function Category() {
  const { category } = useParams();
  const [goods, setGoods] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const listOfSearchParams = ['Rating', 'Price: from lower', 'Price: from bigger'];
  const [selectedMode, setSelectedMode] = useState('Rating');

  function expandSorting() {
    setIsExpanded(true);
  }

  function collapseSorting() {
    setIsExpanded(false);
  }

  useEffect(() => {
    async function getGoods() {
      setGoods([]);
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/goods/${category}`);
      if (response.ok) {
        const resData = await response.json();
        setGoods(resData);
      }
    }
    getGoods();
  }, [category]);

  // 🧩 Мемоизированная сортировка — пересчитается только при смене goods или режима сортировки
  const sortedGoods = useMemo(() => {
    const sorted = [...goods];
    if (selectedMode === 'Rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (selectedMode === 'Price: from lower') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedMode === 'Price: from bigger') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [goods, selectedMode]);

  return (
    <div className="flex flex-col gap-4 max-w-[1200px] mx-auto mt-4 w-full min-h-[70vh]">
      <div className="flex items-end justify-between">
        <p className="text-gray-800 font-bold text-xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg mb-1">
          {category}
        </p>

        <div className="flex items-end text-lg gap-4 relative">
          <p className="text-gray-600">Sort by:</p>
          <div className="relative">
            <button
              className="w-[160px] h-[30px] border border-gray-300 shadow-md hover:shadow-lg rounded-md bg-white text-left px-2 text-gray-600"
              onClick={isExpanded ? collapseSorting : expandSorting}
            >
              {selectedMode}
            </button>

            {isExpanded && (
              <div className="absolute top-[35px] left-0 w-[160px] bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {listOfSearchParams.map((param, index) => (
                  <InputSearchResult
                    key={index}
                    onClick={() => {
                      collapseSorting();
                      setSelectedMode(param);
                    }}
                    value={param}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
            {sortedGoods &&
              sortedGoods.map((item) => (
                <GoodsCard
                  key={item.id}
                  id={item.id}
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
      </div>
    </div>
  );
}

export default Category;
