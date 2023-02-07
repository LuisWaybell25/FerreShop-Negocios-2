import Rating from '@mui/material/Rating';
import BarraProgreso from './BarraProgreso';
import './Opiniones.css'

import valoraciones from '../../valoraciones.json';
import productos from '../../productos.json';


const DesgloceValoraciones = ({idProducto}) => {
    const total = valoraciones.filter(valoracion => valoracion.producto === idProducto).length;
    const infoProducto = productos.find(producto => producto.id === idProducto);
    const cantidadValoraciones = [
        {valoracion: 1, cantidad: 1},
        {valoracion: 2, cantidad: 0},
        {valoracion: 3, cantidad: 0},
        {valoracion: 4, cantidad: 3},
        {valoracion: 5, cantidad: 30},
    ];
    return (
        <div className='card-valoraciones'>
            <div>
                <div className='wrapper'>
                    <h4 className='valoracion'>{new Number(parseFloat(infoProducto.calificacion)).toFixed(1)}</h4>
                    <div>
                        <Rating
                            name="simple-controlled"
                            value={infoProducto.calificacion}
                            readOnly
                        />
                        <p className='cantidad-valoraciones'>Calificaciones: {total}</p>
                    </div>
                    {cantidadValoraciones.reverse().map(({valoracion, cantidad}, i) => (
                        <BarraProgreso key={`barra-estrella-${i}`} estrellas={valoracion} progreso={(cantidad / total) * 100}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default DesgloceValoraciones;