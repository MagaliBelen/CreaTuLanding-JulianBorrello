import { createContext, useState, useContext } from "react";
import { db } from "../firebase/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);

// Componente proveedor
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Función para agregar items al carrito
  const addItem = (item) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((product) => product.id === item.id);

      if (existingProduct) {
        return prevCart.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + item.quantity }
            : product
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  // Función para eliminar un item del carrito y restaurar el stock en Firebase
  const removeItem = async (id) => {
    const itemToRemove = cart.find((product) => product.id === id);
    if (itemToRemove) {
      setCart((prevCart) => prevCart.filter((product) => product.id !== id));

      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const currentStock = productSnap.data().stock || 0;
          const newStock = currentStock + itemToRemove.quantity;

          await updateDoc(productRef, { stock: newStock });
          console.log(`Stock restaurado a ${newStock} para el producto ${id}`);
        }
      } catch (error) {
        console.error("Error al restaurar el stock:", error);
      }
    }
  };

  // Función para vaciar todo el carrito y restaurar el stock de cada producto
  const clearCart = async () => {
    for (const item of cart) {
      await removeItem(item.id);
    }
    setCart([]);
  };

  const getTotalItems = () => cart.reduce((total, product) => total + product.quantity, 0);

  const getTotalPrice = () => cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
