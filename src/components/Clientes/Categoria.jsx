import { useParams  } from "react-router-dom";
import CardProducto from './CardProducto';

import './ListaProductos.css';
import '../../App.css';

const Categoria = () => {
    let params = useParams();

    return (
        <div className="seccion">
            <p className="titulo-seccion">Resultados para la categoría: <span>{params.categoriaId}</span></p>
            <div className='lista-grid'>
                <CardProducto/>
                <CardProducto/>
                <CardProducto/>
                <CardProducto/>
                <CardProducto/>
                <CardProducto/>
                <CardProducto/>
                <CardProducto/>
                <CardProducto/>
                <CardProducto/>
            </div>
        </div>

    );
}
 
export default Categoria;