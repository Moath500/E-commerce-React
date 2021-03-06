import React , {useState , useEffect} from 'react';
import {commerce} from './lib/commerce';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [products , setProducts] = useState([]);
  const [cart , setCart] = useState({});



  const fetchProduct = async () => {
    const {data} = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () =>{
    setCart(await commerce.cart.retrieve());
  }

  const handelAddToCart = async (productId , quantity)=> {
    const item = await commerce.cart.add(productId , quantity);

    setCart(item);
  }

  useEffect(()=>{
    fetchProduct();
    fetchCart();
  },[]);



  return(
    <div>
      <Navbar  totalItems={cart.total_items}/>
       <Products products={products } onAddToCart = {handelAddToCart} />
    </div>
  );
}

export default App;
