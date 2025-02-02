import { Link } from 'react-router-dom';
import './ProductCard.css'

export default function ProductCard({ product }) {
  return (
    <>
      <article>
        <h3>
          {product.title} - {product.id}
        </h3>
        <img src={product.image} alt={product.title} />
        <p>${product.price}</p>
        <button className='buttonDetail'>
          <Link to={`/product/${product.id}`}>Mas detalles</Link>
        </button>
      </article>
    </>
  );
}
