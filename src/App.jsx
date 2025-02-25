import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer";
import ItemListDetail from "./components/ItemListDetail";
import NavBar from "./components/NavBarComponent";
import Error404 from "./components/Error404";
import { CartProvider } from "./context/CartContext"; 
import CartView from "./components/CartView"; 
import { useEffect } from "react"; 
import { getProducts } from "./firebase/firebase"; 

import "./App.css";

function App() {

  useEffect(() => {
    getProducts().then((products) => {
      console.log("Productos cargados:", products);
    }).catch((error) => {
      console.error("Error al cargar productos:", error);
    });
  }, []);
  

  return (
    <CartProvider> 
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer />} />
          <Route exact path="/category/:catId" element={<ItemListContainer />} />
          <Route exact path="/product/:id" element={<ItemListDetail />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/carrito" element={<CartView />} /> 
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
