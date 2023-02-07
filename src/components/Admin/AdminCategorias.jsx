import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import ModalFormulario from './ModalFormulario';
import FormCategoria from './Formularios/FormCategoria';

import useModal from '../../hooks/useModal';
import useConfigFormulario from '../../hooks/useConfigFormulario';

import datos from '../../categorias.json';

const AdminCategorias = () => {

    const [data, setData] = useState(datos)

    const agregarCategoria = (datos) => {
        setData([...data, datos])
        handleClose()
    }
    
    const modificarCategoria = (datos) => {
        data.map((categoria) => {
            if(categoria.id === datos.id) {
                categoria.nombre = datos.nombre;
                categoria.descripcion = datos.descripcion;
            }
            return categoria;
        });
        handleClose()
    }
    
    const [show, handleClose, handleShow] = useModal();

    const [configForm, agregar, editar] = useConfigFormulario({
        mostrar: handleShow,
        fnAgregar: agregarCategoria, 
        fnEditar: modificarCategoria
    });

    const eliminar = (id) => {
        let newCategorias = data.filter(categoria => categoria.id !== id);
        setData(newCategorias);
    }

    return (
        <div>
            <main>
                <div className="seccion">
                    <p className="titulo-seccion con-boton">Categorías</p>
                    <Button sx={{ 
                        // fontSize: '0.75rem',
                        textTransform: 'none', 
                        color: '#A91212',
                        margin: '0 0.25rem 0 auto', 
                        alignSelf: 'center',
                        }}
                        onClick={agregar}
                    >
                        Agregar
                    </Button>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map(categorias => {
                                return (
                                    <tr key={categorias.id}>
                                    <td>{categorias.nombre}</td>
                                    <td>{categorias.descripcion}</td>
                                    <td>
                                        <IconButton onClick={() => editar({id: categorias.id, nombre: categorias.nombre, descripcion: categorias.descripcion})}> <EditIcon/> </IconButton>
                                        <IconButton onClick={() => eliminar(categorias.id)}> <DeleteIcon/> </IconButton>
                                    </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>

                <ModalFormulario seccion="categoría" estado={configForm.estado} show={show} onHide={handleClose} >
                    <FormCategoria datos={configForm.datos} afterValidationAction ={configForm.accion} data={data} setData={setData}/>
                </ModalFormulario>
                
            </main>
        </div>
    );
}
 
export default AdminCategorias;