import BrandComponent from "./BrandComponent";
import ButtonComponent from "./ButtonComponent";
import CartWidget from "./CartWidget";
import './NavBar.css'


export default function NavBarComponent({texto}){
    return(
        <nav>
        <BrandComponent></BrandComponent>
        <ButtonComponent texto='Bijou'></ButtonComponent>
        <ButtonComponent texto='Maquillaje'></ButtonComponent>
        <ButtonComponent texto='Accesorios para el pelo'></ButtonComponent>
        <CartWidget></CartWidget>
        </nav>
    );
}