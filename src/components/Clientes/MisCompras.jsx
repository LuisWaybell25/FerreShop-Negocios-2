import BsButton from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import ListItemProducto from './ListItemProducto';

import ModalFormulario from '../Admin/ModalFormulario';
import FormValoracion from './FormValoracion';

import { useNavigate } from "react-router-dom";

import useModal from '../../hooks/useModal';
import useConfigFormulario from '../../hooks/useConfigFormulario';

import data from '../../ordenes.json';

const MisCompras = () => {

    const agregarRol = (datos) => {
        // aquí va el código de la fn
        handleClose()
    }
    
    const modificarRol = (datos) => {
        // aquí va el código de la fn
        handleClose()
    }

    const valoracion = null;
     
    const [show, handleClose, handleShow] = useModal();

    const [configForm, agregar, editar] = useConfigFormulario({
        mostrar: handleShow,
        fnAgregar: agregarRol, 
        fnEditar: modificarRol
    },
    ['Valora el libro', 'Editar valoración']
    );

    const navigate = useNavigate();

    return (
        <div className="seccion lista">
            <p className="titulo-seccion">Ordenes de compra</p>

            {data.map(producto => {
                return (
                    <ListItemProducto 
                        key={producto.id}
                        imagen={producto.imagen}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        categoria={producto.categoria}
                        descripcion={producto.descripcion}
                    >
                    <BsButton className='mt-auto outline-none' variant="primary" onClick={() => valoracion ? editar(valoracion) : agregar()}> Valorar</BsButton>
                    </ListItemProducto>
                )
            })}

            
            <ModalFormulario estado={configForm.estado} show={show} onHide={handleClose} >
                <FormValoracion datos={configForm.datos} afterSubmitAction ={configForm.accion} />
            </ModalFormulario>
        </div>
    );
}
 
export default MisCompras;