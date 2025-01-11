import GreetingComponent from './GreetingComponent';
import './ItemListContainer.css'

export default function ItemListContainer({greeting}){
    return(
        <>
           <GreetingComponent greeting='Bienvenidos a mi e-commerce'></GreetingComponent> 
        </>
    );
}