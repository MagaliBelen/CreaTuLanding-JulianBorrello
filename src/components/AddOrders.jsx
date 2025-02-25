import { useState } from 'react';
import { sendOrder } from '../firebase/firebase';

export default function AddOrders({ buyer, items, total, onSuccess }) {
  const [orderId, setOrderId] = useState(null);

  const handleClick = async () => {
    if (!buyer || !items.length) {
      console.error('Faltan datos del comprador o del carrito.');
      return;
    }

    const newOrder = {
      buyer,
      date: new Date().toISOString(),
      items,
      total,
    };

    try {
      const id = await sendOrder(newOrder);
      setOrderId(id);
      onSuccess(id); 
    } catch (error) {
      console.error('Error al enviar la orden:', error);
    }
  };

  return (
    <>
      <h3>Confirmar orden de pedido</h3>
      <button onClick={handleClick}>Enviar nueva orden de pedido</button>
      {orderId && <p>Orden generada: {orderId}</p>}
    </>
  );
}
