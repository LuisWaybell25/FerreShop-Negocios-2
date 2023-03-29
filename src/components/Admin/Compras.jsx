import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { getFirestore, collection, doc, updateDoc, onSnapshot, query, setDoc, getDocs } from "firebase/firestore";
import firebaseConfig from '../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

import Swal from 'sweetalert2';

import moment from 'moment';

const Compras = () => {
    const [selectAddProduct, setSelectAddProduct] = useState([])

    const [cantidad, setCantidad] = useState('')

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

    const [showPushSugerencia, setShowPushSugerencia] = useState(false);

    useEffect(() => {
        getProducts();

        getPushProducts();

        let dia = moment().date();
        let mes = moment().month() + 1;
        
        if((mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 312) 
            && dia === 31 ) {
            setShowPushSugerencia(true);
        }

        if((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia === 30) {
            setShowPushSugerencia(true);
        }

        if(mes === 2 && (dia === 28 || dia === 29)) {
            setShowPushSugerencia(true);
        }

    }, [])

    const [pushProducts, setPushProducts] = useState([])

    const getPushProducts = async () => {
        const q = query(collection(db, "compras"));

        const querySnapshot = await getDocs(q);

        let cantidadPush = 0;
 
        const arrayProductos = [];

        querySnapshot.forEach((doc) => {
            cantidadPush = parseInt(cantidadPush) + parseInt(doc.data().cantidad);

            arrayProductos.push(doc.data());
        });
        
        if((cantidadPush / 6) >= 30) {
            setPushProducts([arrayProductos[arrayProductos.length - 1]])
        }
    }

    const comprar = async () => {
        let fecha = moment().format("YYYY/MM/DD");
        
        const compra = {
            nombre: productToBuy[0].nombre,
            cantidad,
            fecha
        }

        const docProductosRef = doc(collection(db, "compras"));
        await setDoc(docProductosRef, compra);

        const totalExistencias = parseInt(productToBuy[0].existencias) + parseInt(cantidad);
        await updateDoc(doc(db, "productos", productToBuy[0].id), {existencias: totalExistencias});

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
            title: '¡Compra exitosa!',
            text: 'Gracias por tu compra',
            icon: 'success',
            confirmButtonText: 'Continuar'
        }).then(() => {
            setCantidad('')
            setSelectedProduct({})
        });

    }

    const [selectedProduct, setSelectedProduct] = useState({});
    const [productToBuy, setProductToBuy] = useState({})

    const handleSelectedProduct = (e) => {
        let id = e.target.value;
        setSelectedProduct(e.target.value);

        let product = selectAddProduct.filter(producto => producto.nombre === id);
        setProductToBuy(product)
    }

    const [selectedPushProduct, setselectedPushProduct] = useState({})
    const [payPushProduct, setpayPushProduct] = useState()
    const handleSelectPushProduct = (e) => {
        let id = e.target.value;
        setselectedPushProduct(e.target.value);

        setSelectedProduct({
            nombre: e.target.value
        });

        setCantidad(30);

        let product = selectAddProduct.filter(producto => producto.nombre === id);
        setProductToBuy(product)
    }
    

    return (
        <div>
            <main>
                <div className="seccion">
                    <p className="titulo-seccion">Compras</p>
                    <div className="d-grid w-100">
                        {showPushSugerencia && (
                            <Alert key='primary' variant='primary' className='mb-1'>
                                <Form.Select 
                                    aria-label="Sugerencias de productos push"
                                    onChange={handleSelectPushProduct}
                                    value={selectedPushProduct.nombre}
                                >
                                    <option>Sugerencias de productos push</option>
                                    {pushProducts?.map(product => {
                                        return (
                                            <option key={product.nombre} value={product.nombre}>{product.nombre}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Alert>  
                        )}  
                    </div>

                    <Form.Select 
                        aria-label="Seleccione el producto a comprar"
                        onChange={handleSelectedProduct}
                        value={selectedProduct.nombre}
                    >
                        <option>Seleccione el producto a comprar</option>
                        {selectAddProduct?.map(product => {
                            return (
                                <option key={product.id} value={product.nombre}>{product.nombre} {'->'} {product.precio}</option>
                            )
                        })}
                    </Form.Select>
                    <Form.Control 
                        type="number" 
                        placeholder="Cantidad" 
                        value={cantidad}
                        onChange={(e)  => setCantidad(e.target.value)}
                    />

                    <Button variant="primary" onClick={comprar}>Comprar</Button>
                </div>
            </main>
        </div>
    );
}
 
export default Compras;