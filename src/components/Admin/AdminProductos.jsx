import React, {useState, useEffect} from 'react';

import Table from 'react-bootstrap/Table';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import ModalFormulario from './ModalFormulario';
import FormProducto from './Formularios/FormProducto';

import useModal from '../../hooks/useModal';
import useConfigFormulario from '../../hooks/useConfigFormulario';

import datos from '../../productos.json';

import './Admin.css';

const AdminProductos = () => {

    const [data, setData] = useState(datos)

    const agregarProducto = (datos) => {

        const url = URL.createObjectURL(datos.imagen);
        datos.imagen = url;

        setData([...data, datos]);

        handleClose()
    }
    
    const modificarProducto = (datos) => {
        data.map((producto) => {
            if(producto.id === datos.id) {

                producto.nombre = datos.nombre;
                producto.descripcion = datos.descripcion;
                producto.precio = datos.precio;
                producto.existencias = datos.existencias;
                producto.imagen = typeof datos.imagen === 'object' ? URL.createObjectURL(datos.imagen) : datos.imagen;
                producto.categoria = datos.categoria;
            }
            return producto;
        });

        handleClose()
    }
    
    const [show, handleClose, handleShow] = useModal();
    const [configForm, agregar, editar] = useConfigFormulario({
        mostrar: handleShow,
        fnAgregar: agregarProducto, 
        fnEditar: modificarProducto
    });

    const eliminar = (id) => {
        let newProducts = data.filter(producto => producto.id !== id);
        setData(newProducts);
    }

    return (
        <div>
            <main>
                <div className="seccion">
                    <p className="titulo-seccion con-boton">Productos</p>
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
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Existencias</th>
                                <th>Categoria</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map(producto => {
                                return (
                                    <tr key={producto.id}>
                                        <td><img className='product-img' src={producto.imagen}/></td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>${(producto.precio).toLocaleString("es-MX")}</td>
                                        <td>{producto.existencias}</td>
                                        <td>{producto.categoria}</td>
                                        <td>
                                            <IconButton onClick={() => editar({id: producto.id, imagen: producto.imagen, nombre: producto.nombre, descripcion: producto.descripcion, precio: producto.precio, existencias: producto.existencias, categoria: producto.categoria})}> <EditIcon/> </IconButton>
                                            <IconButton onClick={() => eliminar(producto.id)}> <DeleteIcon/> </IconButton>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>

                <ModalFormulario size="lg" seccion="producto" estado={configForm.estado} show={show} onHide={handleClose}>
                    <FormProducto datos={configForm.datos} afterValidationAction={configForm.accion} data={data} setData={setData} />
                </ModalFormulario>

            </main>
        </div>
    );
}
 
export default AdminProductos;