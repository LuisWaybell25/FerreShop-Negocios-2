import DesgloceValoraciones from './DesgloceValoraciones';
import ListaOpiniones from './ListaOpiniones';
import './Opiniones.css'

const Opiniones = ({idProducto, calificacion}) => {
    return (
        <div className='contenedor-opiniones'>
            <h3 className='titulo-seccion'>Opiniones del producto</h3>
            <DesgloceValoraciones
                idProducto={idProducto}
            />
            <ListaOpiniones
                idProducto={idProducto}
            />
        </div>
    );
}
 
export default Opiniones;