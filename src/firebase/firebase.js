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


// Añadir una nueva orden
export async function sendOrder(order) {
    const ordersCollection = collection(db, 'orders');
    try {
      const docRef = await addDoc(ordersCollection, order);
      return docRef.id;
    } catch (error) {
      console.error('Error al agregar el documento nuevo: ', error);
    }
}


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