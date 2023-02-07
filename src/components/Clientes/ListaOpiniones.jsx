
import CardOpinion from './CardOpinion';
import './Opiniones.css'

import data from '../../valoraciones.json';

const ListaOpiniones = ({idProducto}) => {
    const valoraciones = data.filter(valoracion => valoracion.producto === idProducto);
    return (
        <div className='lista-opiniones'>

            {valoraciones.map(valoracion => <CardOpinion key={valoracion.id} valoracion={valoracion}/>)}

        </div>
    );
}
 
export default ListaOpiniones;