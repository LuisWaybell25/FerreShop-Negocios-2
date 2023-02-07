import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import StarIcon from '@mui/icons-material/Star';
import './BarraProgreso.css';

const BarraProgreso = ({ estrellas, progreso }) => {
    return (
        <div className={`contenedor-progreso`}>
            <LinearProgress sx={{ 
                width: '100%',
                height: 5,
                borderRadius: 7,
                [`&.${linearProgressClasses.colorPrimary}`]: {
                    backgroundColor: 'rgba(0,0,0,.1)',
                  },
                [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 7,
                    // backgroundColor: '#0bc3e9',
                    // background: '#079dc7',
                }     
            }} 
            variant="determinate" value={progreso > 100 ? 100 : progreso } />
            <p className='estrellas'>{estrellas}</p>
            <p className='porcentaje-progreso'><StarIcon sx={{ fontSize: '1rem' }}/></p>
        </div>
    );
}
 
export default BarraProgreso;