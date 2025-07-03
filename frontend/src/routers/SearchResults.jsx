import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoodsCard from '../components/GoodsCard';
import InputSearchResult from '../ui/InputSearchResult';
import LoadingAnimation from '../components/LoadingAnimation';

function SearchResults() {
  const { result } = useParams();
  const [goodsData, setGoodsData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMode, setSelectedMode] = useState('Rating');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const limit = 8;
  const listOfSearchParams = ['Rating', 'Price: from lower', 'Price: from bigger'];

  const toggleSorting = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    async function getGoods() {
      setIsLoading(true);
      const API_URL = import.meta.env.VITE_API_URL;
      const skip = (page - 1) * limit;

      let sortParam = '';
      if (selectedMode === 'Rating') sortParam = 'rating_desc';
      else if (selectedMode === 'Price: from lower') sortParam = 'price_asc';
      else if (selectedMode === 'Price: from bigger') sortParam = 'price_desc';

      try {
        const response = await fetch(
          `${API_URL}/user/search?request=${encodeURIComponent(result)}&sort=${sortParam}&skip=${skip}&limit=${limit}`
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setGoodsData(data.items || []);
        setTotalItems(data.total || 0);
      } catch (error) {
        console.error(error);
        setGoodsData([]);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    }

    getGoods();
  }, [result, selectedMode, page]);

  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

  const goToPrevPage = () => setPage((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="max-w-[1200px] mx-auto mt-4 min-h-[70vh] flex flex-col gap-4 px-4">
      <div className="flex items-end justify-between">
        <h1 className="text-gray-800 font-bold text-xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg mb-1">
          Results for: <span className="font-normal">"{result}"</span>
        </h1>
        <div className="flex items-center gap-4 relative">
          <span className="text-gray-600">Sort by:</span>
          <div className="relative">
            <button
              onClick={toggleSorting}
              className="w-[160px] h-[30px] border border-gray-300 shadow-md hover:shadow-lg rounded-md bg-white text-left px-2 text-gray-600"
            >
              {selectedMode}
            </button>

            {isExpanded && (
              <div className="absolute top-[35px] left-0 w-[160px] bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {listOfSearchParams.map((param, idx) => (
                  <InputSearchResult
                    key={idx}
                    onClick={() => {
                      setSelectedMode(param);
                      setPage(1);
                      setIsExpanded(false);
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
      ) : goodsData.length > 0 ? (
        <div className="flex flex-col w-full gap-2">
          <div className="flex w-full justify-center">
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
              {goodsData.map((item) => (
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
      ) : (
        <p className="text-center text-gray-600 col-span-full">No items found</p>
      )}

      <div className="flex justify-center items-center gap-4 mt-6 mb-8 select-none">
        <button
          onClick={goToPrevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md gradient-btn-red transition-colors duration-300 ease-in-out ${
            page === 1 ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-100'
          }`}
        >
          &lt;
        </button>

        <span className="font-semibold text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md gradient-btn-green transition-colors duration-300 ease-in-out ${
            page === totalPages ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-100'
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default SearchResults;
