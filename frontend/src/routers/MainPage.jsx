import MainCarousel from '../components/Carousel';
import PopularGoods from '../components/PopularGoods';
import { Outlet } from 'react-router-dom';

const tempCarouselList = [
  {
    image_link: "https://marketing.brain.com.ua/static/imgb/2042896.jpg",
    go_to_link: "https://brain.com.ua/ukr/",
  },
  {
    image_link: "https://marketing.brain.com.ua/static/imgb/2042930.jpg",
    go_to_link: "https://brain.com.ua/ukr/",
  },
  {
    image_link: "https://marketing.brain.com.ua/static/imgb/2043096.jpg",
    go_to_link: "https://brain.com.ua/ukr/",
  }
];


function MainPage() {

  return ( 
    <div className='flex flex-col '>
      <Outlet />
      <div className='flex flex-col max-w-[1200px] w-full mx-auto mt-4'>

      <MainCarousel listOfObjects={tempCarouselList}/>
        <PopularGoods title="Best Sellers" request_link="goods/bestsellers" req_type="noToken" see_more_link="Bestsellers"/>
        <PopularGoods title="Smartphones"  request_link="goods/Smartphones?skip=0&limit=10&sort=rating_desc" req_type="noToken" see_more_link="Smartphones"/>
        <PopularGoods title="Laptops" request_link="goods/Laptops?skip=0&limit=10&sort=rating_desc" req_type="noToken" see_more_link="Laptops"/>
      </div>
    </div>
  )
}

export default MainPage
