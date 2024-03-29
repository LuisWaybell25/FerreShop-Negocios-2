import React, {useState, useEffect, useContext} from 'react';

import Table from 'react-bootstrap/Table';

import { getFirestore, collection, doc, updateDoc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import firebaseConfig from '../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

import { AuthContext } from "../../context/AuthContext";

import RowCotización from './RowCotización';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DeleteIcon from '@mui/icons-material/Delete';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import moment from 'moment';

const Cotizaciones = () => {

    const { user } = useContext(AuthContext);

    const [cotizaciones, setCotizaciones] = useState([])

    const [showModal, setShowModal] = useState(false);

    const [numberProducts, setNumberProducts] = useState(1)

    const [editProductData, setEditProductData] = useState({});

    const [total, setTotal] = useState(0);

    const [productsCopy, setProductsCopy] = useState([])

    const [productsLenght, setProductsLenght] = useState(0);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (producto) => {

        let totalAcumulado = 0;

        (producto.products).map((product) => {
            totalAcumulado += parseInt(product.precio);
        });
        setTotal(totalAcumulado);

        setEditProductData(producto);
        setProductsCopy(producto);
        setShowModal(true);

        setProductsLenght(producto.products.length)
    }

    useEffect(() => {
        getProducts();
        if(user !== null) {
            const q = query(collection(db, "historialProcesos"), where("userUid", "==", user.uid), where("estado", "==", "activo"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                
                const arrayCotizaciones = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    arrayCotizaciones.push(data);
                });

                console.log(arrayCotizaciones);

                setCotizaciones(arrayCotizaciones);
                
            });

            return () => {
                unsubscribe()
            }
        }
        
    }, [user])

    const pay = async () => {
        let fecha = moment().format("YYYY/MM/DD");

        const venta = {
            producto: editProductData.products[0].nombre,
            cantidad: 1,
            fecha
        }

        await updateDoc(doc(db, "historialProcesos", editProductData.id), {estado: 'pagado'});
        const docVentasRef = doc(collection(db, "ventas"));
        await setDoc(docVentasRef, venta);

        handleCloseModal();
    }

    const deleteProduct = async (id) => {
        let newProducts = (editProductData.products).filter(producto => producto.id !== id);
        setEditProductData({...editProductData, products: newProducts});
    }

    const save = async () => {
        await updateDoc(doc(db, "historialProcesos", editProductData.id), {products: editProductData.products});
        const docProductosRef = doc(collection(db, "historialProcesos", editProductData.id, "subcotizacion"));
        
        let fecha = moment().format("DD/MM/YYYY HH:mm:ss A");

        const proceso = {
            proceso: 'cotización',
            products: productsCopy.products,
            fecha: fecha,
            estado: 'edicion',
            userUid: productsCopy.userUid,
        }
        
        await setDoc(docProductosRef, proceso);

        handleCloseModal();
    }

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

    const [selectedProduct, setSelectedProduct] = useState({});

    const handleSelectedProduct = (e) => {
        let id = e.target.value;
        setSelectedProduct(e.target.value);

        let product = selectAddProduct.filter(producto => producto.id === id);

        let editp = editProductData.products;

        editp.push(...product)

        setEditProductData({...editProductData, products: editp})
    }

    return (
        <div className='p-5'>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Cotización</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha y Hora</Form.Label>
                        <Form.Control
                            type="text"
                            value={editProductData.fecha}
                            disabled
                        />
                    </Form.Group>
                    
                    <Form.Label>Productos</Form.Label>
                    {(editProductData.products)?.map(producto => {
                        return (
                            <Row className="mb-3" key={producto.id}>
                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="number"
                                        value={numberProducts}
                                        onChange={(e) => setNumberProducts(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="text"
                                        value={producto.nombre}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="text"
                                        value={producto.precio}
                                        disabled
                                    />
                                </Form.Group>
                                {productsLenght !== 1 ? (
                                    <Form.Group as={Col}>
                                        <Button variant="danger" onClick={() => deleteProduct(producto.id)}><DeleteIcon/></Button>
                                    </Form.Group>  
                                ) : (
                                    <></>
                                )}
                            </Row>
                        )
                    })}

                    <Form.Select 
                        aria-label="Agregar productos" 
                        className='mb-3'
                        onChange={handleSelectedProduct}
                        value={selectedProduct.nombre}
                    >
                        <option>- Agregar productos -</option>
                        {selectAddProduct?.map(product => {
                            return (
                                <option key={product.id} value={product.id}>{product.nombre} {'->'} {product.precio}</option>
                            )
                        })}
                    </Form.Select>

                    <Form.Group className="mb-3">
                        <Form.Label>Monto</Form.Label>
                        <Form.Control
                            type="text"
                            value={total}
                            disabled
                        />
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="success" onClick={pay}>
                            Pagar
                        </Button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={save}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>

            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Fecha y Hora</th>
                        <th>Productos</th>
                        <th>Monto Total</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>

                    {cotizaciones.map(producto => {
                        return (
                            <RowCotización key={producto.id} producto={producto} handleShowModal={handleShowModal} setEditProductData={setEditProductData} />
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Cotizaciones