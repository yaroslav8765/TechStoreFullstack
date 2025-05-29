import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  background: '#ffffff',
};
const MainCarousel = (props) => {

  const onChange = currentSlide => {
    console.log(currentSlide);
  };

  return (
    <div className='mb-3'>
        <Carousel arrows infinite={true} autoplay autoplaySpeed={5000}>

        {props.listOfObjects && props.listOfObjects.map((Item, index) => {
            return (
                <div className="flex items-center justify-center">
                    <div style={contentStyle}>
                        <img
                            className="mx-auto h-full w-full object-cover"
                            src={Item.image_link}
                            alt="slide"
                        />
                    </div>
                </div>
            );
        })}
        </Carousel>
    </div>
  );
};

export default MainCarousel;