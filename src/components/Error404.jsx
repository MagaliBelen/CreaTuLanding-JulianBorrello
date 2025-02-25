import { Link } from 'react-router-dom';
import './Error404.css'; 

export default function Error404 (){
return(
    <>
    <div className="error-container">
      <h1>Error 404</h1>
      <p>Oops... La página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
    </>
  );
}

