import './CartWidget.css';

export default function CartWidget(){
    return(
        <div className="cart-container">
            <img className="cart" src="/public/shopping_cart.png" alt="Cart"></img>
            <p className='cart-number'>2</p>
        </div>
    );
}
