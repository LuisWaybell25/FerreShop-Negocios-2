import { useParams, useLocation} from "react-router-dom";
import InformaciónPrincipal from './InformaciónPrincipal';
import InformacionExtra from "./InformacionExtra";

import '../../App.css';
import './Producto.css';
import './ListItemProducto.css';

const Producto = () => {
    let params = useParams();
    const location = useLocation();
    // console.log(location.state);

    return (
        <>
            <InformaciónPrincipal
                id={location.state.id}
                imagen={location.state.imagen}
                nombre={location.state.nombre}
                precio={location.state.precio}
                existencias={location.state.existencias}
                categoria={location.state.categoria}
                descripcion={location.state.descripcion}
                calificacion={location.state.calificacion}
                />        
            <InformacionExtra 
                idProducto={location.state.id}
                descripcion={location.state.descripcion}
                resenia={location.state.resenia}
                calificacion={location.state.calificacion}
            />        
        </>

    );
}
 
export default Producto;