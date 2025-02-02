import BrandComponent from "./BrandComponent";
import ButtonComponent from "./ButtonComponent";
import CartWidget from "./CartWidget";
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBarComponent({ texto }) {
    return (
        <nav>
            <Link to="/">
                <BrandComponent />
            </Link>
            
            <Link to="/category/bijou">
                <ButtonComponent texto="Bijou" />
            </Link>

            <Link to="/category/maquillaje">
                <ButtonComponent texto="Maquillaje" />
            </Link>

            <Link to="/category/accesorios">
                <ButtonComponent texto="Accesorios para el pelo" />
            </Link>

            <CartWidget />
        </nav>
    );
}
