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

import { getFirestore, collection, doc, setDoc, onSnapshot, query, deleteDoc } from "firebase/firestore";
import firebaseConfig from '../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

import './Admin.css';
import Product from './Product';

const AdminProductos = () => {

    const [data, setData] = useState(datos);

    const [products, setProducts] = useState([]);

    const [actualizar, setActualizar] = useState(false);

    const agregarProducto = (datos) => {

        handleClose()
    }
    
    const modificarProducto = (datos) => {
        data.map((producto) => {
            if(producto.id === datos.id) {

                producto.nombre = datos.nombre;
                producto.descripcion = datos.descripcion;
                producto.precio = datos.precio;
                producto.existencias = datos.existencias;
                producto.imagen = datos.imagen;
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

    const eliminar = async (id) => {

        await deleteDoc(doc(db, "productos", id)).then(() => {
            let newProducts = data.filter(producto => producto.id !== id);
            setData(newProducts);
        })
        .catch((error) => {
            
        });
    }

    const getProducts = () => {
        const q = query(collection(db, "productos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            
            const arrayProductos = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                arrayProductos.push(data);
            });
            
            setProducts(arrayProductos);
            
        });

        return () => {
            unsubscribe()
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

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

                            {products.map(producto => {
                                
                                return (
                                    <Product key={producto.id} producto={producto} editar={editar} eliminar={eliminar} actualizar={actualizar} />
                                )
                            })}
                        </tbody>
                    </Table>
                </div>

                <ModalFormulario size="lg" seccion="producto" estado={configForm.estado} show={show} onHide={handleClose}>
                    <FormProducto datos={configForm.datos} afterValidationAction={configForm.accion} data={data} setData={setData} handleClose={handleClose} getProducts={getProducts} setActualizar={setActualizar} />
                </ModalFormulario>

            </main>
        </div>
    );
}
 
export default AdminProductos;