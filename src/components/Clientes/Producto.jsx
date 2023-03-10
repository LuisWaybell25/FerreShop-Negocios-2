import { useParams, useLocation} from "react-router-dom";
import InformaciĆ³nPrincipal from './InformaciĆ³nPrincipal';
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
            <InformaciĆ³nPrincipal
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