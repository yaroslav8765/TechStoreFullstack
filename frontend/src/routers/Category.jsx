import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoodsCard from '../components/GoodsCard';
import InputSearchResult from '../ui/InputSearchResult';
import LoadingAnimation from '../components/LoadingAnimation';

function SearchResults() {
  const { result } = useParams();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortMode, setSortMode] = useState('Rating');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const limit = 8;
  const sortOptions = ['Rating', 'Price: from lower', 'Price: from bigger'];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const pages = Math.max(Math.ceil(total / limit), 1);
    setTotalPages(pages);
  }, [total]);

  useEffect(() => {
    const fetchGoods = async () => {
      setIsLoading(true);
      setItems([]); // Очищаем товары, но total оставляем
      const API_URL = import.meta.env.VITE_API_URL;
      const skip = (page - 1) * limit;

      let sortQuery = '';
      if (sortMode === 'Rating') sortQuery = 'rating_desc';
      else if (sortMode === 'Price: from lower') sortQuery = 'price_asc';
      else if (sortMode === 'Price: from bigger') sortQuery = 'price_desc';

      try {
        const response = await fetch(
          `${API_URL}/user/search?request=${encodeURIComponent(result)}&sort=${sortQuery}&skip=${skip}&limit=${limit}`
        );
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setItems(data.items || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error(error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoods();
  }, [result, sortMode, page]);

  return (
    <div className="max-w-[1200px] mx-auto mt-4 min-h-[70vh] flex flex-col gap-6 px-4">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-gray-800 font-bold text-xl sm:text-2xl lg:text-3xl">
          Results for: <span className="font-normal">"{result}"</span>
        </h1>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-[180px] h-[36px] border border-gray-300 shadow hover:shadow-md rounded bg-white text-left px-3 text-gray-600"
          >
            Sort by: {sortMode}
          </button>

          {isDropdownOpen && (
            <div className="absolute top-[40px] left-0 w-[180px] bg-white border border-gray-200 shadow rounded z-50">
              {sortOptions.map((option) => (
                <InputSearchResult
                  key={option}
                  value={option}
                  onClick={() => {
                    setSortMode(option);
                    setPage(1);
                    setIsDropdownOpen(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center w-full min-h-[60vh]">
          <LoadingAnimation />
        </div>
      ) : items.length ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
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
      ) : (
        <p className="text-center text-gray-600">No items found</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded gradient-btn-red ${
              page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            &lt;
          </button>

          <span className="text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded gradient-btn-green ${
              page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
