import GreetingComponent from './GreetingComponent';
import { useState, useEffect } from 'react';
import { getProducts, getCategory } from '../firebase/firebase.js'; 
import ProductCard from './ProductCard.jsx';
import { useParams } from 'react-router-dom';
import './ItemListContainer.css';



export default function ItemListContainer({ greeting }) {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const { catId } = useParams();

    useEffect(() => {
        setLoading(true);
        if (!catId) {
            // Llama a Firebase para obtener todos los productos
            getProducts().then((response) => {
                setProducts(response);
                setLoading(false);
            }).catch((error) => {
                console.error('Error al obtener productos:', error);
                setLoading(false);
            });
        } else {
            // Llama a Firebase para obtener productos por categoría
            getCategory(catId).then((response) => {
                setProducts(response);
                setLoading(false);
            }).catch((error) => {
                console.error('Error al obtener la categoría:', error);
                setLoading(false);
            });
        }
    }, [catId]);

    const categoryTitle = catId
        ? `Productos de ${catId.charAt(0).toUpperCase() + catId.slice(1)}`
        : "Todos nuestros productos";

    return (
        <>
            <GreetingComponent greeting='Bienvenidos a mi e-commerce' />
            <h1>{categoryTitle}</h1>

            {loading ? (
                <p className="loading">Cargando productos ...</p> 
            ) : (
                <div className='products'>
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </>
    );
}