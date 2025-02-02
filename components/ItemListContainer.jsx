import GreetingComponent from './GreetingComponent';
import { useState, useEffect } from 'react';
import { getCategory, getProducts } from '../asyncMock.js';
import ProductCard from './ProductCard.jsx';
import { useParams } from 'react-router-dom';
import './ItemListContainer.css'

export default function ItemListContainer({greeting}){

    const [products, setProducts] = useState(null);
    const { catId } = useParams();

    
  useEffect(() => {
    if (!catId) {
      getProducts().then((response) => setProducts(response));
    } else {
      getCategory(catId).then((response) => setProducts(response));
    }
  }, [catId]);


    // Formato el título de la categoría
    const categoryTitle = catId 
        ? `Productos de ${catId.charAt(0).toUpperCase() + catId.slice(1)}` 
        : "Todos nuestros productos";

    return(
        <>
           <GreetingComponent greeting='Bienvenidos a mi e-commerce'></GreetingComponent> 
           <h1>{categoryTitle}</h1>
           <div className='products'>
            {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
      ))}
          </div>
        </>
    );
}
