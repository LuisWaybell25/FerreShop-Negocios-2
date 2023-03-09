import React, { useState, useEffect } from 'react'

import './ListItemProducto.css';

import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import firebaseConfig from '../../utils/firebaseConfig'
const storage = getStorage(firebaseConfig);

const ListItemProducto = ({children, imagen, nombre, precio, categoria, descripcion}) => {

    const [image, setImage] = useState("");

    useEffect(() => {
        getDownloadURL(ref(storage, 'products/' + imagen))
        .then((url) => {
            
            setImage(url)
        })
        .catch((error) => {
            
        });
    }, [])

    return (
        <div className='card horizontal w-100'>
            <div className='img-contenedor'>
                <p className='categoria'>{categoria}</p>
                <img src={image} className='imagen'/>
            </div>

            <div className='info-contenedor'>
                <h4 className='title'>{nombre}</h4>

                <p className='descripcion'>{descripcion}</p>

                <div className='precio'>
                    <span>${precio.toLocaleString("es-MX")}</span>
                </div>

                <div className='acciones gap'>
                    {children}
                </div>

            </div>

        </div>
    );
}
 
export default ListItemProducto;