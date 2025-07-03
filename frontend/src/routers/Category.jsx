import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import GoodsCard from '../components/GoodsCard';
import InputSearchResult from '../ui/InputSearchResult';
import LoadingAnimation from '../components/LoadingAnimation';

function Category() {
  const { category } = useParams();
  const [goodsData, setGoodsData] = useState({ total: 0, items: [] });
  const [isExpanded, setIsExpanded] = useState(false);
  const listOfSearchParams = ['Rating', 'Price: from lower', 'Price: from bigger'];
  const [selectedMode, setSelectedMode] = useState('Rating');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const limit = 8;

  function expandSorting() {
    setIsExpanded(true);
  }

  function collapseSorting() {
    setIsExpanded(false);
  }

  useEffect(() => {
    async function getGoods() {
      setIsLoading(true);
      setGoodsData({ total: 0, items: [] });
      const API_URL = import.meta.env.VITE_API_URL;

      const skip = (page - 1) * limit;

      let sortParam = '';
      if (selectedMode === 'Rating') {
        sortParam = 'rating_desc';
      } else if (selectedMode === 'Price: from lower') {
        sortParam = 'price_asc';
      } else if (selectedMode === 'Price: from bigger') {
        sortParam = 'price_desc';
      }

      const response = await fetch(
        `${API_URL}/goods/${category}?skip=${skip}&limit=${limit}&sort=${sortParam}`
      );

      if (response.ok) {
        const resData = await response.json();
        setGoodsData(resData);
      }

      setIsLoading(false);
    }

    getGoods();
  }, [category, selectedMode, page]);

  const goodsArray = goodsData.items ?? [];

  const sortedGoods = useMemo(() => {
    const sorted = [...goodsArray];
    if (selectedMode === 'Rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (selectedMode === 'Price: from lower') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedMode === 'Price: from bigger') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [goodsArray, selectedMode]);

  const totalPages = Math.ceil(goodsData.total / limit);

  function goToPrevPage() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function goToNextPage() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

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
                      setPage(1); 
                    }}
                    value={param}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-full min-h-[70vh]">
          <LoadingAnimation />
        </div>
      ) : (
        <> 
          <div className="flex flex-col w-full gap-2">
            <div className="flex w-full justify-center">
              <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
                {sortedGoods.length ? (
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
                  ))
                ) : (
                  <p className="text-center text-gray-600 col-span-full">No items found</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-6 mb-8 select-none">
            <button
              onClick={goToPrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md gradient-btn-red transition-colors duration-300 ease-in-out ${
                page === 1
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:bg-gray-100'
              }`}
            >
              &lt; 
            </button>

            <span className="font-semibold text-gray-700">
              Page {page} of {totalPages || 1}
            </span>

            <button
            onClick={goToNextPage}
            disabled={page === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-md gradient-btn-green transition-colors duration-300 ease-in-out
                ${page === totalPages || totalPages === 0
                ? 'cursor-not-allowed opacity-60'
                : 'hover:bg-gray-100'}
            `}
            >
             &gt;
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Category;
