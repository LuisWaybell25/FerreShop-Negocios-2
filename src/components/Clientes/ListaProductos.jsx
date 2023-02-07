
import './ListaProductos.css';

const ListaProductos = () => {
    return (
        <div className='lista-grid'>
            <CardProducto/>
            <CardProducto/>
            <CardProducto/>
            <CardProducto/>
            <img className="img-banner" src="https://links.papareact.com/dyz" alt="banner" />
            <CardProducto/>
            <CardProducto/>
            <CardProducto/>
            <CardProducto/>
            <CardProducto/>
            <CardProducto/>
        </div>
    );
}
 
export default ListaProductos;