import './GreetingComponent.css';

export default function GreetingComponent({ greeting }) {
    return (
        <div className="hero-container">
            <img className="imagenHero" src="../public/imagen hero.png" alt="imagen hero" />
            <h1 className="texto-encima">{greeting}</h1>
        </div>
    );
}
