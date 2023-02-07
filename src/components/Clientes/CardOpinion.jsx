import Rating from '@mui/material/Rating';
import './Opiniones.css'

const CardOpinion = ({valoracion}) => {
    return (
        <div className='card-opinion'>
            <Rating
                name="simple-controlled"
                value={valoracion.estrellas}
                size="small"
                readOnly
            />
            {/* <p className='fecha'>06 jun 2022</p> */}
            <p>{valoracion.comentario}</p>
        </div>
    );
}
 
export default CardOpinion;