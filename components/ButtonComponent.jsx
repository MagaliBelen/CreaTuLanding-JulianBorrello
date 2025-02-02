import './ButtonComponent.css'

export default function ButtonComponent({texto}){
    return(
        <>
        <button className='buttonNav'>{texto}</button>
        </>
    );
}