import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./custom-swiper.css";
import { Pagination, Navigation } from 'swiper/modules';
import SmallImage from '../ui/SmallImage';


function GoodsPicturesSlider({mainPicture, pictures}){
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(()=>{
        console.log(pictures);
    },[])

    function smallImageClick(event){
    const id = parseInt(event.target.id, 10);
    if (swiperInstance) {
        swiperInstance.slideToLoop(id, 500);
    }
    }

    return <>
        <Swiper
            pagination={{
            type: 'fraction',
            }}
            spaceBetween={100}
            navigation={true}
            loop={true}
            modules={[Pagination, Navigation]}
            className="mySwiper rounded-md"
            onSwiper={setSwiperInstance}
        >
            <SwiperSlide><img src={mainPicture} className='object-contain w-full h-full'/></SwiperSlide>
            {pictures&& pictures.map((image, index)=>
                <SwiperSlide>
                    <img src={image.url} className='swiper-slide'/>
                </SwiperSlide>
            )}
        </Swiper>



        <div className='flex flex-wrap'>
            <SmallImage 
                clickAction={smallImageClick}
                url={mainPicture} 
                key = {0}
                id = {0}
            />
            {pictures&& pictures.map((image, index)=>
                <SmallImage 
                clickAction={smallImageClick}
                url={image.url} 
                key = {index+1}
                id = {index+1}
                />
            )}



        </div>
    </>
}

export default GoodsPicturesSlider;