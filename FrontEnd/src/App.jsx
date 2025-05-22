import { useEffect, useState } from 'react'
import GoodsCard from './components/GoodsCard'
import NavBar from './routers/NavBar';
import MainCarousel from './components/Carousel';
import PopularGoods from './components/PopularGoods';
import Footer from './routers/Footer';
import listOfLinks from './links';

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


const tempBestSellers = [
  {
    id: 1,
    name: "Наушники HyperX Cloud II",
    price: 2999,
    rating: 4.8,
    voted: 235,
    product_link: listOfLinks.contact_us
  },
  {
    id: 2,
    name: "Мышь Logitech G502",
    price: 1899,
    rating: 4.7,
    voted: 310,
    old_price: 300,
    product_link: listOfLinks.contact_us
  },
  {
    id: 3,
    name: "Клавиатура SteelSeries Apex 7",
    price: 3699,
    rating: 4.6,
    voted: 180,
    old_price: 300,
    product_link: listOfLinks.contact_us
  },
  {
    id: 4,
    name: "Монитор LG UltraGear 27\"",
    price: 8499,
    rating: 4.9,
    voted: 420,
    old_price: 300,
    product_link: listOfLinks.contact_us
  },
  {
    id: 5,
    name: "Монитор LG UltraGear 27\"",
    price: 8499,
    rating: 4.9,
    voted: 420,
    product_link: listOfLinks.contact_us
  },
  {
    id: 6,
    name: "Монитор LG UltraGear 27\"",
    price: 8499,
    rating: 4.9,
    voted: 420,
    old_price: 300,
    product_link: listOfLinks.contact_us

  },

];


function App() {
  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(listOfLinks.smartphones)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Error fetching product:", err));
  }, []);

  console.log(product);

  return ( 
    <div className='flex flex-col '>
      <NavBar />
      <div className='flex flex-col max-w-[1200px] w-full mx-auto mt-4'>

      <MainCarousel listOfObjects={tempCarouselList}/>
        <PopularGoods title="Best Sellers" goodsCards={tempBestSellers} category_link="youtube.com"/>
        <PopularGoods title="Smartphones" goodsCards={tempBestSellers} category_link="youtube.com"/>
        <PopularGoods title="Laptops" goodsCards={tempBestSellers} category_link="youtube.com"/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
