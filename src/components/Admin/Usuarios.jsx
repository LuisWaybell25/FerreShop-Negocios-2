import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ModalFormulario from './ModalFormulario';
import FormUsuario from './Formularios/FormUsuario';

import useModal from '../../hooks/useModal';
import useConfigFormulario from '../../hooks/useConfigFormulario';

import datos from '../../usuarios.json';

const Usuarios = () => {

    const [data, setData] = useState(datos)

    const agregarUsuario = (datos) => {
        setData([...data, datos])
        handleClose()
    }
    
    const modificarUsuario = (datos) => {
        data.map((usuario) => {
            if(usuario.id === datos.id) {
                usuario.correo = datos.correo;
                usuario.nombre = datos.nombre;
                usuario.rol = datos.rol;
            }
            return usuario;
        });
        handleClose()
    }
    
    const [show, handleClose, handleShow] = useModal();

    const [configForm, agregar, editar] = useConfigFormulario({
        mostrar: handleShow,
        fnAgregar: agregarUsuario, 
        fnEditar: modificarUsuario
    });

    const eliminar = (id) => {
        let newUsuarios = data.filter(usuario => usuario.id !== id);
        setData(newUsuarios);
    }

    return (
        <div>
            <main>
                <div className="seccion">
                    <p className="titulo-seccion con-boton">Usuarios</p>
                    <Button sx={{ 
                        textTransform: 'none', 
                        color: '#A91212',
                        margin: '0 0.25rem 0 auto', 
                        alignSelf: 'center',
                        }}
                        onClick={agregar}
                    >
                        Agregar
                    </Button>
                    <div className='tabla-full'>
                        <Table striped bordered hover className='tabla-full'>
                            <thead>
                                <tr>
                                    <th>Correo</th>
                                    <th>Nombre</th>
                                    <th>Rol</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(usuario => {
                                    return (
                                        <tr key={usuario.id}>
                                            <td>{usuario.correo}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.rol}</td>
                                            <td>
                                                <IconButton onClick={() => editar({id: usuario.id,correo: usuario.correo, nombre: usuario.nombre, rol: usuario.rol})}> <EditIcon/> </IconButton>
                                                <IconButton onClick={() => eliminar(usuario.id)}> <DeleteIcon/> </IconButton>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <ModalFormulario seccion="usuario" estado={configForm.estado} show={show} onHide={handleClose} >
                    <FormUsuario datos={configForm.datos} afterValidationAction ={configForm.accion} data={data} setData={setData}/>
                </ModalFormulario>

            </main>
        </div>
    );
}
 
export default Usuarios;