// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import "./CartWidget.css";

// export default function CartWidget() {
//   const [cart] = useContext(CartContext);

//   return (
//     <div className="cart-container">
//       <img className="cart" src="/shopping_cart.png" alt="Cart" />
//       <p className="cart-number">{cart.length}</p>
//     </div>
//   );
// }

// import { useCart } from "../context/CartContext";
// import "./CartWidget.css";

// export default function CartWidget() {
//   const { getTotalItems } = useCart();

//   return (
//     <div className="cart-container">
//       <img className="cart" src="/shopping_cart.png" alt="Cart" />
//       <p className="cart-number">{getTotalItems()}</p>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartWidget.css";

export default function CartWidget() {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/carrito"); // Redirige a la vista del carrito
  };

  return (
    <div className="cart-container" onClick={handleCartClick}>
      <img className="cart" src="/shopping_cart.png" alt="Cart" />
      <p className="cart-number">{getTotalItems()}</p>
    </div>
  );
}

