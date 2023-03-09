import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DragDropImage from './DragDropImage';

import dataCategorias from '../../../categorias.json';

import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firebaseConfig from '../../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

// Firebase de firebase storage
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage(firebaseConfig);

import { v4 as uuidv4 } from "uuid";

const FormProducto = ({ datos, afterValidationAction, data, setData, handleClose, getProducts, setActualizar}) => {

    const [url, setUrl] = useState("");

    useEffect(() => {
      if(datos?.imagen != null) {
        getDownloadURL(ref(storage, 'products/' + datos.imagen))
        .then((url) => {
            
            setUrl(url);
        })
        .catch((error) => {
            
        });
      }
    }, [])
    
    const [validated, setValidated] = useState(false);

    const [datosForm, setDatosForm] = useState(datos ?? {
        nombre: '',
        descripcion: '',
        precio: '',
        existencias: '',
        imagen: null,
        categoria: ''
    });

    const { nombre, descripcion, precio, existencias, imagen, categoria }  = datosForm;

    const actualizarInfoForm = (propiedad, valor) => {
        setDatosForm({
            ...datosForm,
            [propiedad]: valor
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const imageName = uuidv4();
        const image = datosForm.imagen;

        const productsData = {
            nombre: datosForm.nombre,
            descripcion: datosForm.descripcion,
            precio: datosForm.precio,
            existencias: datosForm.existencias,
            imagen: imageName,
            categoria: datosForm.categoria
        }

        const storageRef = ref(storage, `products/${imageName}`);
        uploadBytes(storageRef, image).then((snapshot) => {
            
        });

        // Se guardan los datos generales del paciente
        const docProductosRef = doc(collection(db, "productos"));
        await setDoc(docProductosRef, productsData);

        handleClose();

        getProducts();

        setActualizar(true);

    };    

    
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-1">
                <Form.Group  as={Col} controlId="exampleForm.ControlFile1">
                    <Form.Label>Imagen</Form.Label>
                    <DragDropImage url={url} imagen={imagen} setImagen={(imagen) => actualizarInfoForm('imagen', imagen)}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor añada una imagen.
                    </Form.Control.Feedback>
                </Form.Group>
                <Col>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            aria-describedby="inputGroupPrepend"
                            required
                            defaultValue={nombre}
                            onChange={e => actualizarInfoForm('nombre', e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese un nombre.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        placeholder="Descripción" 
                        rows={5} 
                        maxLength={500}
                        defaultValue={descripcion}
                        onChange={e => actualizarInfoForm('descripcion', e.target.value)}
                    />
                </Form.Group>
                </Col>
            </Row>

            <Row className="mb-2">
                <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Precio"
                        aria-describedby="inputGroupPrepend"
                        required
                        min={1}
                        defaultValue={precio}
                        onChange={e => actualizarInfoForm('precio', e.target.value)}
                    />
                    <Form.Text id="priceHelpBlock" muted>
                        Ingrese una cantidad mayor a 0 sin comas.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Por favor ingrese un precio válido para el producto.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                    <Form.Label>Existencias</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Existencias"
                        aria-describedby="inputGroupPrepend"
                        required
                        max={150}
                        min={0}
                        defaultValue={existencias}
                        onChange={e => actualizarInfoForm('existencias', e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor ingrese una cantidad válida de unidades (Puede ser 0).
                    </Form.Control.Feedback>
                </Form.Group>          
            </Row>

            <Row className="mb-2">
                <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control required as="select" type="select" onChange={e => actualizarInfoForm('categoria', e.target.value)} value={categoria}>
                    <option value="">Seleccione una categoría</option>
                    {dataCategorias.map(categorias => {
                        return (
                            <option key={categorias.id} value={categorias.nombre}>{categorias.nombre}</option>
                        )
                    })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor seleccione una categoría.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            
            <Button type="submit">Guardar</Button>
        </Form>
    );
}
 
export default FormProducto;