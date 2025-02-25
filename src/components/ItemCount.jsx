import { useState } from "react";
import "./ItemListDetail.css";

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [quantity, setQuantity] = useState(initial);

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="counter">
        <div className="quantity-controls">
            <p>Seleccione cantidad del producto:</p>
            <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                -
            </button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} disabled={quantity >= stock}>
                +
            </button>
      </div>
      <div>
            <button className="buttonAgregar" onClick={() => onAdd(quantity)}>
                Agregar al carrito
            </button>
      </div>
    </div>
  );
}
