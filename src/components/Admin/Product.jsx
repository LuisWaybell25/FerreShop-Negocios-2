import React, {useEffect, useState} from 'react'

// Firebase de firebase storage
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import firebaseConfig from '../../utils/firebaseConfig';
const storage = getStorage(firebaseConfig);

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Product = ({producto, editar, eliminar, actualizar}) => {

    const [image, setImage] = useState("");

    useEffect(() => {
        getDownloadURL(ref(storage, 'products/' + producto.imagen))
        .then((url) => {
            
            setImage(url)
        })
        .catch((error) => {
            
        });
    }, [actualizar])
    

    return (
        <tr key={producto.id}>
            <td><img className='product-img' src={image}/></td>
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
}

export default Product