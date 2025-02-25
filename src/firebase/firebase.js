// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { collection, getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA4Wmyv-aZ69UozMwV4gwt21kxIIFtleug",
//   authDomain: "react-project-4190a.firebaseapp.com",
//   projectId: "react-project-4190a",
//   storageBucket: "react-project-4190a.firebasestorage.app",
//   messagingSenderId: "451245995193",
//   appId: "1:451245995193:web:7026b6b53c120cebe95768"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

// // export async function getItems(){
// //         const querySnapshot = await getDocs(collection(db, 'products'))
// //         querySnapshot.forEach(doc=> console.log(`${doc.id} => ${doc.data()}`))
// // }

// //obtener un producto
// export async function getSingleProduct(id) {
//     const documentRef = doc(db, 'products', id);
  
//     try {
//       const snapshot = await getDoc(documentRef);
//       if (snapshot.exists()) {
//         return snapshot.data();
//       } else {
//         console.log('El documento no existe!');
//       }
//     } catch (error) {
//       console.error('Error al obtener el documento: ', error);
//     }
//   }
  
//   //obtener toda una coleccion
//   export async function getProducts() {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'products'));
//       if (querySnapshot.size !== 0) {
//         const productsList = querySnapshot.docs.map((docu) => {
//           return {
//             id: docu.id,
//             ...docu.data(),
//           };
//         });
//         return productsList;
//       } else {
//         console.log('Coleccion vacía !');
//       }
//     } catch (error) {
//       console.error('Error al obtener la coleccion: ', error);
//     }
//   }
  
//   //filtros de precio
//   export async function filterProductsByPrice(price) {
//     try {
//       const filteredQuery = query(
//         collection(db, 'products'),
//         where('price', '<', price)
//       );
//       const querySnapshot = await getDocs(filteredQuery);
//       if (querySnapshot.size !== 0) {
//         const productsList = querySnapshot.docs.map((docu) => {
//           return {
//             id: docu.id,
//             ...docu.data(),
//           };
//         });
//         return productsList;
//       } else {
//         console.log('Coleccion vacía !');
//       }
//     } catch (error) {
//       console.error('Error al obtener el documento: ', error);
//     }
//   }
  
//   //agregar una nueva orden de pedido
//   export async function sendOrder(order) {
//     const ordersCollection = collection(db, 'orders');
//     try {
//       const docRef = await addDoc(ordersCollection, order);
//       return docRef.id;
//     } catch (error) {
//       console.error('Error al agregar el documento nuevo ', error);
//     }
//   }
  
//   //actualizar un producto
//   export async function updateProduct(id, toUpdate) {
//     const itemDocRef = doc(db, 'products', id);
//     try {
//       await updateDoc(itemDocRef, toUpdate);
//       alert('Se actualizo el producto!');
//     } catch (error) {
//       console.log('Hubo un error al actualizar!', error);
//     }
//   }
  
//   //actualizar multiples productos
//   export async function updateMultiple() {
//     const batch = writeBatch(db); //creando el batch
  
//     const docRef1 = doc(db, 'products', 'ZjkF4RdijYUaR3gseS30');
//     const docRef2 = doc(db, 'orders', '0Nu9HbjYKc7hmS67nNzd');
  
//     batch.update(docRef1, { description: 'usb Logitech' });
//     batch.update(docRef2, { total: 1212 });
  
//     try {
//       await batch.commit(); //ejecuta todas las actualizaciones juntas
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, writeBatch } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4Wmyv-aZ69UozMwV4gwt21kxIIFtleug",
  authDomain: "react-project-4190a.firebaseapp.com",
  projectId: "react-project-4190a",
  storageBucket: "react-project-4190a.appspot.com", 
  messagingSenderId: "451245995193",
  appId: "1:451245995193:web:7026b6b53c120cebe95768"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Obtener un solo producto
export async function getSingleProduct(id) {
    const documentRef = doc(db, 'products', id); 
  
    try {
      const snapshot = await getDoc(documentRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
      } else {
        console.log('El documento no existe!');
      }
    } catch (error) {
      console.error('Error al obtener el documento: ', error);
    }
}

// Obtener todos los productos
// export async function getProducts() {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'products'));
//       if (!querySnapshot.empty) {
//         return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       } else {
//         console.log('Colección vacía!');
//       }
//     } catch (error) {
//       console.error('Error al obtener la colección: ', error);
//     }
// }

// Filtrar productos por precio
// export async function filterProductsByPrice(price) {
//     try {
//       const filteredQuery = query(
//         collection(db, 'products'),
//         where('price', '<', price)
//       );
//       const querySnapshot = await getDocs(filteredQuery);
//       if (!querySnapshot.empty) {
//         return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       } else {
//         console.log('No se encontraron productos en el rango de precio!');
//       }
//     } catch (error) {
//       console.error('Error al obtener los productos: ', error);
//     }
// }

// Filtrar productos por Categoria
// export async function filterProductsByCategory(category) {
//      try {
//        const filteredQuery = query(
//          collection(db, 'products'),
//          where('category', '=', category)
//        );
//        const querySnapshot = await getDocs(filteredQuery);
//        if (!querySnapshot.empty) {
//          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//        } else {
//          console.log('No se encontraron productos en esa categoria!');
//        }
//      } catch (error) {
//        console.error('Error al obtener los productos: ', error);
//      }
//  }

// Enviar una nueva orden
export async function sendOrder(order) {
    const ordersCollection = collection(db, 'orders');
    try {
      const docRef = await addDoc(ordersCollection, order);
      return docRef.id;
    } catch (error) {
      console.error('Error al agregar el documento nuevo: ', error);
    }
}

// Actualizar un producto
// export async function updateProduct(id, toUpdate) {
//     const itemDocRef = doc(db, 'products', id);
//     try {
//       await updateDoc(itemDocRef, toUpdate);
//       alert('¡Producto actualizado con éxito!');
//     } catch (error) {
//       console.log('Hubo un error al actualizar!', error);
//     }
// }

// Actualizar múltiples documentos con batch
// export async function updateMultiple() {
//     const batch = writeBatch(db);
  
//     const docRef1 = doc(db, 'products', 'ZjkF4RdijYUaR3gseS30');
//     const docRef2 = doc(db, 'orders', '0Nu9HbjYKc7hmS67nNzd');
  
//     batch.update(docRef1, { description: 'usb Logitech' });
//     batch.update(docRef2, { total: 1212 });
  
//     try {
//       await batch.commit(); // Ejecuta todas las actualizaciones
//       console.log('Batch de actualizaciones completado');
//     } catch (error) {
//       console.log('Error en batch:', error);
//     }
// }


// Obtener todos los productos
export async function getProducts() {
  try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
  } catch (error) {
      console.error('Error al obtener productos:', error);
  }
}

// Obtener productos por categoría
export async function getCategory(catId) {
  try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('category', '==', catId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
  } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
  }
}