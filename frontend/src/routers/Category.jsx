import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoodsCard from '../components/GoodsCard';
import Filters from '../components/Filters';

function Category(){
    const { category } = useParams();
    const [goods, setGoods] = useState([]);
    useEffect(()=>{
        async function getGoods() {
            setGoods([])
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/goods/${category}`);
            if(response.ok){
                const resData = await response.json();
                setGoods(resData);
                console.log(resData);
            }
        }
        getGoods();
    },[category])

    return <div className='flex flex-col gap-4 max-w-[1200px] mx-auto mt-4 w-full min-h-[70vh]'>
        <div className='flex items-end justify-between'>    
            <p className='text-gray-800 font-bold text-xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg mb-1'>{category}</p>
            <div className='flex items-end text-lg gap-4'>
                <p className='text-gray-600 '>Sort by:</p>
                <button className='w-[160px] h-[30px] border border-gray-100 shadow-md hover:shadow-lg rounded-md'></button>
            </div>
        </div>
        <div className='flex flex-col w-full gap-2'>
            <div className="w-[176px] ">
                <Filters />
            </div>
            <div className='flex w-full justify-center'>
                <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
                    {goods &&
                        goods.map((item) => (
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
}

export default Category;