import React, {useState, useEffect, useContext} from 'react';

import Table from 'react-bootstrap/Table';

import { getFirestore, collection, doc, updateDoc, onSnapshot, query, deleteDoc, where } from "firebase/firestore";
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

const Cotizaciones = () => {

    const { user } = useContext(AuthContext);

    const [cotizaciones, setCotizaciones] = useState([])

    const [showModal, setShowModal] = useState(false);

    const [numberProducts, setNumberProducts] = useState(1)

    const [editProductData, setEditProductData] = useState({});

    const [total, setTotal] = useState(0);

    const [productsLenght, setProductsLenght] = useState(0);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (producto) => {

        let totalAcumulado = 0;

        (producto.products).map((product) => {
            totalAcumulado += parseInt(product.precio);
        });
        setTotal(totalAcumulado);

        setEditProductData(producto);
        setShowModal(true);

        setProductsLenght(producto.products.length)
    }

    useEffect(() => {
        if(user !== null) {
            const q = query(collection(db, "historialProcesos"),where("userUid", "==", user.uid), where("estado", "==", "activo"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                
                const arrayCotizaciones = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    arrayCotizaciones.push(data);
                });

                setCotizaciones(arrayCotizaciones);
                
            });

            return () => {
                unsubscribe()
            }
        }
        
    }, [user])

    const pay = async () => {
        await updateDoc(doc(db, "historialProcesos", editProductData.id), {estado: 'pagado'});
        handleCloseModal();
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
                                        <Button variant="danger"><DeleteIcon/></Button>
                                    </Form.Group>  
                                ) : (
                                    <></>
                                )}
                            </Row>
                        )
                    })}

                    <div className="d-grid mt-3 mb-3">
                        <Button variant="primary">
                            Agegar productos
                        </Button>
                    </div>

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
                <Button variant="primary" onClick={handleCloseModal}>
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