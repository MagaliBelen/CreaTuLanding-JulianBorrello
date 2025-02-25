import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { useCart } from "../context/CartContext"; 
import ItemCount from "../components/ItemCount";
import "./ItemListDetail.css";

export default function ItemListDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No se encontró el producto");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (quantity) => {
    if (product && product.stock >= quantity) {
      addItem({ ...product, quantity });

      // Actualizar stock en Firebase
      const newStock = product.stock - quantity;
      try {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, { stock: newStock });
        setProduct((prev) => ({ ...prev, stock: newStock }));
      } catch (error) {
        console.error("Error al actualizar el stock en Firebase:", error);
      }
    } else {
      alert("No hay suficiente stock disponible.");
    }
  };

  return (
    <div className="container">
      <article className="detail">
        <h1>Vista de Detalle del producto</h1>
        {product ? (
          <>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <p>Descripción: {product.description}</p>
            <p>Categoría: {product.category}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock disponible: {product.stock}</p>

            <ItemCount 
              stock={product.stock} 
              initial={1} 
              onAdd={handleAddToCart} 
            />
          </>
        ) : (
          <p>Cargando producto...</p>
        )}
      </article>
    </div>
  );
}
