import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../asyncMock';
import './ItemListDetail.css';

export default function ItemListDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProduct(getProduct(id));
  }, [id]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="container">
      <article className='detail'>
        <h1>Vista de Detalle de producto {id}</h1>
        <p>ID: {product?.id}</p>
        <h3>Nombre: {product?.title}</h3>
        <img src={product?.image} alt="" />
        <p>Descripción: {product?.description}</p>
        <p>Categoría: {product?.category}</p>
        <p>Precio: ${product?.price}</p>

        {/* Contador de productos */}
        <div className="counter">
          <p>Seleccione cantidad del producto:</p>
          <button onClick={decreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>

        <button className='buttonAgregar'>Agregar al carrito</button>

      </article>
    </div>
  );
}
