import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer'
import './App.css'
import ItemListDetail from '../components/ItemListDetail'
import NavBar from '../components/NavBarComponent';
import Error404 from '../components/Error404';


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer />} />
          <Route exact path="/category/:catId" element={<ItemListContainer />} />
          <Route exact path="/product/:id" element={<ItemListDetail />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
