import Opiniones from './Opiniones'; 

import '../../App.css';
import './Producto.css';

const InformacionExtra = ({idProducto, descripcion, resenia, calificacion}) => {
    return (
        <div className="contenedor-informacion seccion">
            <h3 className='titulo-seccion'>Descripción</h3>
            <p className='descripcion'>{descripcion}</p>
        
            <Opiniones 
                idProducto={idProducto}
                resenia={resenia}
                calificacion={calificacion}
            />
        </div>
    );
}
 
export default InformacionExtra;