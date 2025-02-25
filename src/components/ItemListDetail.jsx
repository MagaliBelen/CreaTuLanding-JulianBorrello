// import { useEffect, useState } from "react"; 
// import { useParams } from "react-router-dom";
// import { getProduct } from "../../asyncMock";
// import { useCart } from "../context/CartContext"; 
// import "./ItemListDetail.css";


// export default function ItemListDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { addItem } = useCart();

//   useEffect(() => {
//     setProduct(getProduct(id));
//   }, [id]);

//   const increaseQuantity = () => setQuantity(quantity + 1);
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   const handleAddToCart = () => {
//     if (product) {
//       addItem({ ...product, quantity });
//     }
//   };

//   return (
//     <div className="container">
//       <article className="detail">
//         <h1>Vista de Detalle de producto {id}</h1>
//         <p>ID: {product?.id}</p>
//         <h3>Nombre: {product?.title}</h3>
//         <img src={product?.image} alt="" />
//         <p>Descripción: {product?.description}</p>
//         <p>Categoría: {product?.category}</p>
//         <p>Precio: ${product?.price}</p>

//         <div className="counter">
//           <p>Seleccione cantidad del producto:</p>
//           <button onClick={decreaseQuantity}>-</button>
//           <span>{quantity}</span>
//           <button onClick={increaseQuantity}>+</button>
//         </div>

//         <button className="buttonAgregar" onClick={handleAddToCart}>
//           Agregar al carrito
//         </button>
//       </article>
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from "react"; 
// import { useParams } from "react-router-dom";
// import { db } from "../firebase/firebase"; // Importa tu configuración de Firebase
// import { doc, getDoc } from "firebase/firestore"; 
// import { useCart } from "../context/CartContext"; 
// import "./ItemListDetail.css";

// export default function ItemListDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { addItem } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const docRef = doc(db, "products", id); // Usa la colección y el ID del producto
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setProduct({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           console.log("No se encontró el producto");
//         }
//       } catch (error) {
//         console.error("Error al obtener el producto:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const increaseQuantity = () => setQuantity(quantity + 1);
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   const handleAddToCart = () => {
//     if (product) {
//       addItem({ ...product, quantity });
//     }
//   };

//   return (
//     <div className="container">
//       <article className="detail">
//         <h1>Vista de Detalle del producto</h1>
//         {product ? (
//           <>
          
//             <h2>{product.title}</h2>
//             <img src={product.image} alt={product.title} />
//             <p>Descripción: {product.description}</p>
//             <p>Categoría: {product.category}</p>
//             <p>Precio: ${product.price}</p>

//             <div className="counter">
//               <p>Seleccione cantidad del producto:</p>
//               <button onClick={decreaseQuantity}>-</button>
//               <span>{quantity}</span>
//               <button onClick={increaseQuantity}>+</button>
//             </div>

//             <button className="buttonAgregar" onClick={handleAddToCart}>
//               Agregar al carrito
//             </button>
//           </>
//         ) : (
//           <p>Cargando producto...</p>
//         )}
//       </article>
//     </div>
//   );
// }


///////////////////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { db } from "../firebase/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore"; // Importa updateDoc para actualizar Firebase
// import { useCart } from "../context/CartContext";
// import "./ItemListDetail.css";

// export default function ItemListDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { addItem } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const docRef = doc(db, "products", id);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setProduct({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           console.log("No se encontró el producto");
//         }
//       } catch (error) {
//         console.error("Error al obtener el producto:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const increaseQuantity = () => {
//     if (product && quantity < product.stock) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   const handleAddToCart = async () => {
//     if (product && quantity <= product.stock) {
//       addItem({ ...product, quantity });
      
//       // Actualizar el stock en Firebase
//       try {
//         const newStock = product.stock - quantity;
//         const productRef = doc(db, "products", product.id);
//         await updateDoc(productRef, { stock: newStock });
        
//         // Actualiza el estado local para reflejar el nuevo stock
//         setProduct((prev) => ({ ...prev, stock: newStock }));
        
//         console.log("Stock actualizado correctamente");
//       } catch (error) {
//         console.error("Error al actualizar el stock:", error);
//       }
//     } else {
//       console.log("No hay suficiente stock disponible");
//     }
//   };

//   return (
//     <div className="container">
//       <article className="detail">
//         <h1>Vista de Detalle del producto</h1>
//         {product ? (
//           <>
//             <h2>{product.title}</h2>
//             <img src={product.image} alt={product.title} />
//             <p>Descripción: {product.description}</p>
//             <p>Categoría: {product.category}</p>
//             <p>Precio: ${product.price}</p>
//             <p>Stock disponible: {product.stock}</p>

//             <div className="counter">
//               <p>Seleccione cantidad del producto:</p>
//               <button onClick={decreaseQuantity}>-</button>
//               <span>{quantity}</span>
//               <button onClick={increaseQuantity}>+</button>
//             </div>

//             <button
//               className="buttonAgregar"
//               onClick={handleAddToCart}
//               disabled={quantity > product.stock}
//             >
//               Agregar al carrito
//             </button>
//           </>
//         ) : (
//           <p>Cargando producto...</p>
//         )}
//       </article>
//     </div>
//   );
// }


/////////////////////////////////////////////////////

// import { useEffect, useState } from "react"; 
// import { useParams } from "react-router-dom";
// import { db } from "../firebase/firebase"; 
// import { doc, getDoc, updateDoc } from "firebase/firestore"; 
// import { useCart } from "../context/CartContext"; 
// import "./ItemListDetail.css";

// export default function ItemListDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { addItem } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const docRef = doc(db, "products", id);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setProduct({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           console.log("No se encontró el producto");
//         }
//       } catch (error) {
//         console.error("Error al obtener el producto:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const increaseQuantity = () => {
//     if (product && quantity < product.stock) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   const handleAddToCart = async () => {
//     if (product && product.stock >= quantity) {
//       addItem({ ...product, quantity });

//       // Actualizar stock en Firebase
//       const newStock = product.stock - quantity;
//       try {
//         const productRef = doc(db, "products", id);
//         await updateDoc(productRef, { stock: newStock });
//         setProduct((prev) => ({ ...prev, stock: newStock }));
//       } catch (error) {
//         console.error("Error al actualizar el stock en Firebase:", error);
//       }
//     } else {
//       alert("No hay suficiente stock disponible.");
//     }
//   };

//   return (
//     <div className="container">
//       <article className="detail">
//         <h1>Vista de Detalle del producto</h1>
//         {product ? (
//           <>
//             <h2>{product.title}</h2>
//             <img src={product.image} alt={product.title} />
//             <p>Descripción: {product.description}</p>
//             <p>Categoría: {product.category}</p>
//             <p>Precio: ${product.price}</p>
//             <p>Stock disponible: {product.stock}</p>

//             <div className="counter">
//               <p>Seleccione cantidad del producto:</p>
//               <button onClick={decreaseQuantity}>-</button>
//               <span>{quantity}</span>
//               <button onClick={increaseQuantity}>+</button>
//             </div>

//             <button className="buttonAgregar" onClick={handleAddToCart}>
//               Agregar al carrito
//             </button>
//           </>
//         ) : (
//           <p>Cargando producto...</p>
//         )}
//       </article>
//     </div>
//   );
// }


///////////////////////////////////////

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
