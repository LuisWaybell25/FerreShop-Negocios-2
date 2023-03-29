import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { getFirestore, collection, doc, updateDoc, onSnapshot, query, setDoc, where, getDocs } from "firebase/firestore";
import firebaseConfig from '../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

import moment from 'moment';

const InformeVentas = () => {
    const [selectAddProduct, setSelectAddProduct] = useState([])

    const getProducts = () => {
        const q = query(collection(db, "productos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            
            const arrayProductos = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                arrayProductos.push(data);
            });
            
            setSelectAddProduct(arrayProductos);
            
        });
    }

    const getVentas = async () => {

        let fd = moment().format(firstDate, "DD/MM/YYYY HH:mm:ss A");
        let sd = moment().format(secondDate, "DD/MM/YYYY HH:mm:ss A");

        let ffd = fd.replace(/-/g, "/");
        let fsd = fd.replace(/-/g, "/");

        let product = selectAddProduct.filter(producto => producto.id === idSereched);

        const q = query(collection(db, "ventas"), where("producto", "==", product[0].nombre),
                        where("fecha", ">=", ffd), where("fecha", "<=", fsd));

        const querySnapshot = await getDocs(q);

        let cantidad = 0;
 
        querySnapshot.forEach((doc) => {
            cantidad = cantidad + doc.data().cantidad;
        });

        product[0].cantidad = cantidad;

        let productIsAlredyAdded = productsSerched.filter(producto => producto.id === product[0].id);

        if (productIsAlredyAdded.length === 0) {
            setProductsSerched([...productsSerched, product[0]])
        } else {
            let newProducts = productsSerched.filter(producto => producto.id !== product.id);
            setProductsSerched(newProducts)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    const [selectedProduct, setSelectedProduct] = useState({});
    const [productsSerched, setProductsSerched] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')
    const [idSereched, setIdSereched] = useState('')

    const [test, settest] = useState([])

    const handleSelectedProduct = (e) => {
        let id = e.target.value;
        setSelectedProduct(e.target.value);
        setIdSereched(id)

    }
    
    const eliminar = async (id) => {
        let product = productsSerched.filter(producto => producto.id !== id);
        setProductsSerched(product)
    }

    const buscar = () => {
        getVentas();
    }

    return (
        <div>
            <main>
                <div className="seccion">
                    <p className="titulo-seccion">InformeVentas</p>

                    <div className="row w-100">
                        <div className="col-6">
                        <Form.Select 
                            aria-label="Seleccione el producto a comprar"
                            onChange={handleSelectedProduct}
                            value={selectedProduct.nombre}
                        >
                            <option>Seleccione el producto a comprar</option>
                            {selectAddProduct?.map(product => {
                                return (
                                    <option key={product.id} value={product.id}>{product.nombre}</option>
                                )
                            })}
                        </Form.Select>
                        </div>
                        <div className="col-2">
                            <Form.Control
                                type='date'
                                value={firstDate}
                                onChange={e => setFirstDate(e.target.value)}
                            />
                        </div>
                        <div className="col-2">
                            <Form.Control
                                type='date'
                                value={secondDate}
                                onChange={e => setSecondDate(e.target.value)}
                            />
                        </div>
                        <div className="col-2">
                            <div className="d-grid">
                                <Button variant="primary" onClick={buscar}>Buscar</Button>
                            </div>
                        </div>
                    </div>


                    {productsSerched.length != 0 ? (
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Compras</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsSerched.map(producto => {
                                    return (
                                        <tr key={producto.nombre}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>
                                                <IconButton onClick={() => eliminar(producto.id)}> <DeleteIcon/> </IconButton>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <></>
                    )}
                </div>
            </main>
        </div>
    );
}
 
export default InformeVentas;