import { useEffect, useState } from 'react'
import GoodsCard from './components/GoodsCard'
import NavBar from './components/NavBar';
import MainCarousel from './components/Carousel';
import PopularGoods from './components/PopularGoods';
import Footer from './components/Footer';

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
  },
  {
    id: 2,
    name: "Мышь Logitech G502",
    price: 1899,
    rating: 4.7,
    voted: 310,
  },
  {
    id: 3,
    name: "Клавиатура SteelSeries Apex 7",
    price: 3699,
    rating: 4.6,
    voted: 180,
  },
  {
    id: 4,
    name: "Монитор LG UltraGear 27\"",
    price: 8499,
    rating: 4.9,
    voted: 420,
  },
  {
    id: 5,
    name: "Монитор LG UltraGear 27\"",
    price: 8499,
    rating: 4.9,
    voted: 420,
  },
  {
    id: 6,
    name: "Монитор LG UltraGear 27\"",
    price: 8499,
    rating: 4.9,
    voted: 420,
  },

];


function App() {
  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/goods/Smartphones")
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



        <div className='flex flex-wrap gap-4 '>
          {product && product.map((noteItem, index) => {
            return (
              <div key={index}>
                <GoodsCard 
                  img="https://pm1.aminoapps.com/7954/ed76c65c9eadc327e24b378f3b65aa4fa4fc2749r1-479-512v2_00.jpg"
                  producName={noteItem.name}
                  price={noteItem.price}
                  rating={4}
                  voted={10}
                />
              </div>
            );
          })}
        </div>

        <PopularGoods title="Best Sellers" goodsCards={tempBestSellers}/>

        <PopularGoods title="Smartphones" goodsCards={tempBestSellers}/>

        <PopularGoods title="Laptops" goodsCards={tempBestSellers}/>

        {/* <PopularGoods title="TV`s" goodsCards={tempBestSellers}/> */}

      </div>
      <Footer/>
    </div>
  )
}

export default App
