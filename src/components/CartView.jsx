// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";
// import "./CartView.css";

// export default function CartView() {
//   const { cart, getTotalPrice, removeItem, clearCart } = useCart();
//   const [showCheckout, setShowCheckout] = useState(false); // Estado para alternar la vista

//   if (cart.length === 0) {
//     return <h2 className="mensajeCarritoVacio">El carrito está vacío</h2>;
//   }

//   if (showCheckout) {
//     return (
//       <div className="checkout-form-container">


//       <div className="checkout-form">
//         <h2>Formulario de Checkout</h2>
//         <form>
//         {cart.map((item) => (
//           <li key={item.id} className="cart-item">
//             <img src={item.image} alt={item.title} className="cart-item-image" />
//             <div className="cart-item-info">
//               <h3>{item.title}</h3>
//               <p>Precio: ${item.price}</p>
//               <p>Cantidad: {item.quantity}</p>
//               <p>Subtotal: ${item.price * item.quantity}</p>
//               <button className="buttonClean" onClick={() => removeItem(item.id)}>Eliminar</button>
//             </div>
//           </li>
//         ))}
//           <h3 style={{ color: 'green', marginTop: '10px', marginBottom: '20px' }}>
//           Total: ${getTotalPrice()}
//           </h3>

//           <label>
//             Nombre:
//             <input type="text" placeholder="Ingrese su nombre" required />
//           </label>
//           <label>
//             Email:
//             <input type="text" placeholder="Ingrese su email" required />
//           </label>
//           <label>
//             Teléfono:
//             <input type="tel" placeholder="Ingrese su teléfono" required />
//           </label>
//           <div className="buttonsCheckout">
//           <button type="submit" className="buttonFinalize">Confirmar compra</button>
//           <button type="button" onClick={() => setShowCheckout(false)} className="buttonClean">Volver al carrito</button>
//           </div>
//         </form>
//       </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-view">
//       <h2>Mi Carrito 🛒</h2>
//       <ul>
//         {cart.map((item) => (
//           <li key={item.id} className="cart-item">
//             <img src={item.image} alt={item.title} className="cart-item-image" />
//             <div className="cart-item-info">
//               <h3>{item.title}</h3>
//               <p>Precio: ${item.price}</p>
//               <p>Cantidad: {item.quantity}</p>
//               <p>Subtotal: ${item.price * item.quantity}</p>
//               <button className="buttonClean" onClick={() => removeItem(item.id)}>Eliminar</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="total">
//         <h3>Total: ${getTotalPrice()}</h3>
//         <div className="buttons">
//           <Link to="/">
//             <button className="buttonContinueBuying">Seguir comprando</button>
//           </Link>
//           <button onClick={clearCart} className="buttonClean">Vaciar Carrito</button>
//           <button onClick={() => setShowCheckout(true)} className="buttonFinalize">Finalizar compra</button>
//         </div>
//       </div>
//     </div>
//   );
// }


/////////////////////////////////////////////

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { sendOrder } from "../firebase/firebase"; 
import "./CartView.css";

export default function CartView() {
  const { cart, getTotalPrice, removeItem, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyer({ ...buyer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    console.log("Enviando la orden...");

    const order = {
      buyer,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: getTotalPrice(),
      date: new Date(),
    };

    try {
      const id = await sendOrder(order);
      console.log("ID de la orden generada:", id);
      setOrderId(id);
      clearCart(); // Limpiar carrito solo después de generar la orden
      setShowCheckout(false);
    } catch (error) {
      console.error("Error al generar la orden:", error);
    }
  };

  // Mostrar mensaje de éxito si se generó un ID de orden
  if (orderId) {
    return (
      <div className="mensajeExito">
        <h3>¡Compra generada con éxito!</h3>
        <p>ID de la orden: <strong>{orderId}</strong></p>
        <Link to="/">
          <button className="buttonContinueBuying">Volver al inicio</button>
        </Link>
      </div>
    );
  }

  // Si el carrito está vacío y no hay una orden generada
  if (cart.length === 0) {
    return <h2 className="mensajeCarritoVacio">El carrito está vacío</h2>;
  }

  // Mostrar formulario de checkout si se selecciona finalizar compra
  if (showCheckout) {
    return (
      <div className="checkout-form-container">
        <div className="checkout-form">
          <h2>Formulario de Checkout</h2>

          <div className="resumen-compra">
            <h3>Resumen de la compra</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.title} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <h3 style={{ color: 'green' }}>Total: ${getTotalPrice()}</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={buyer.name}
                onChange={handleInputChange}
                placeholder="Ingrese su nombre"
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={buyer.email}
                onChange={handleInputChange}
                placeholder="Ingrese su email"
                required
              />
            </label>
            <label>
              Teléfono:
              <input
                type="tel"
                name="phone"
                value={buyer.phone}
                onChange={handleInputChange}
                placeholder="Ingrese su teléfono"
                required
              />
            </label>
            <div className="buttonsCheckout">
              <button type="submit" className="buttonFinalize">Confirmar compra</button>
              <button type="button" onClick={() => setShowCheckout(false)} className="buttonClean">
                Volver al carrito
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Vista normal del carrito si no se ha iniciado el checkout
  return (
    <div className="cart-view">
      <h2>Mi Carrito 🛒</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Subtotal: ${item.price * item.quantity}</p>
              <button className="buttonClean" onClick={() => removeItem(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total">
        <h3>Total: ${getTotalPrice()}</h3>
        <div className="buttons">
          <Link to="/">
            <button className="buttonContinueBuying">Seguir comprando</button>
          </Link>
          <button onClick={clearCart} className="buttonClean">Vaciar Carrito</button>
          <button onClick={() => setShowCheckout(true)} className="buttonFinalize">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}

