import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./ThumbnailsSlider.css";
import { Navigation, Pagination } from 'swiper/modules';
import SmallImage from './SmallImage'; 


const ThumbnailsSlider = ({ pictures, smallImageClick }) => {

  
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={10}
      navigation={true}
      loop={true}
      pagination={{
        clickable: true,
        type: 'fraction',
      }}
      modules={[Navigation, Pagination]}
      className="mySwiper"
    >
      {pictures &&
        pictures.map((image, index) => (
          <SwiperSlide key={index}>
            <SmallImage
              clickAction={smallImageClick}
              url={image.url}
              id={index + 1}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ThumbnailsSlider;
