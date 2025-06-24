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
            <p className='text-gray-800 font-bold text-4xl mb-1'>{category}</p>
            <div className='flex items-end text-lg gap-4'>
                <p className='text-gray-600 '>Sort by:</p>
                <button className='w-[160px] h-[30px] border border-gray-100 shadow-md hover:shadow-lg rounded-md'></button>
            </div>
        </div>
        <div className='flex justify-between w-full '>
            <div className="w-[360px] ">
                <Filters />
            </div>
            <div className="flex flex-wrap gap-6 flex-1 max-w-[792px]">
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
}

export default Category;