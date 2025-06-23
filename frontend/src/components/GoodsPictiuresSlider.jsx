import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./GoodsPicturesSlider.css";
import { Pagination, Navigation } from 'swiper/modules';
import ThumbnailsSlider from '../ui/ThumbnailsSlider';
import ImageZoom from "react-image-zooom";


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

    return <div className='flex flex-col max-h-[650px] max-w-[500px] gap-4 rounded-xl'>
        
        <div className='max-h-[500px]'>
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
                <SwiperSlide><ImageZoom  src={mainPicture} className='object-contain w-full h-full'/></SwiperSlide>
                {pictures&& pictures.map((image, index)=>
                    <SwiperSlide key={index}>
                    <div className="h-[500px] w-full flex items-center justify-center overflow-hidden">
                        <ImageZoom 
                        src={image.url}
                        className="h-full w-auto object-contain"
                        />
                    </div>
                    </SwiperSlide>


                )}
            </Swiper>
        </div>


    <ThumbnailsSlider mainPicture={mainPicture} pictures={pictures} smallImageClick={smallImageClick} />


    </div>
}

export default GoodsPicturesSlider;