import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import SmallImage from '../ui/SmallImage';


function GoodsPicturesSlider({mainPicture, pictures}){

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
        >
            <SwiperSlide className='object-contain'><img src={mainPicture} /></SwiperSlide>
            <SwiperSlide><img src='https://images8.alphacoders.com/931/thumb-1920-931700.jpg'/></SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
        <SmallImage url="https://images8.alphacoders.com/931/thumb-1920-931700.jpg"/>

    </>
}

export default GoodsPicturesSlider;