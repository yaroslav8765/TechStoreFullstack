import { useEffect, useState } from 'react'
import GoodsCard from './components/GoodsCard'
import NavBar from './components/NavBar';

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
        <div className='flex flex-wrap gap-4 '>
          <GoodsCard 
            img="https://pm1.aminoapps.com/7954/ed76c65c9eadc327e24b378f3b65aa4fa4fc2749r1-479-512v2_00.jpg"
            producName="Torhu - very cool dragonmaid waifu. Best waifu in the world"
            price={123}
            rating={5}
            voted={999}
          />
        </div>

        {/* {product && product.map((noteItem, index) => {
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
            
          })} */}
      </div>
    </div>
  )
}

export default App
