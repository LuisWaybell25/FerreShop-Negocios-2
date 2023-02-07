import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';

import { useNavigate } from "react-router-dom";

import './ListItemProducto.css';

import Swal from 'sweetalert2';

const CardProducto = ({id, imagen, nombre, precio, existencias, categoria, descripcion, calificacion, resenia}) => {

    // const [value, setValue] = React.useState(2);
    const navigate = useNavigate();

    const addToCart = () => {

        const productsCart =  JSON.parse(localStorage.getItem('productsCart'));

        const productInfo = {
            id,
            imagen,
            nombre, 
            precio,  
            categoria, 
            existencias,
            descripcion,
            resenia
        }

        if(productsCart !== null) {
            localStorage.setItem('productsCart', JSON.stringify([...productsCart, productInfo]));
        } else {
            localStorage.setItem('productsCart', JSON.stringify([productInfo]));
        }

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
            title: '¡Buena elección!',
            text: 'Tu producto se ha añadio al carrito',
            icon: 'success',
            confirmButtonText: 'Continuar'
        }).then(() => {
            
        });
    }

    return (
        <div className='item-libro card link' onClick={(e) => !e.target.className.includes('btn') ? navigate("/producto/123",{state: {id, imagen, nombre, precio, existencias, categoria, descripcion, calificacion, resenia}}) : null}>
            <p className='categoria'>{categoria}</p>
            <img src={imagen} className='imagen'/>

            <h4 className='title'>{nombre}</h4>

            <div className='flex'>
                {/* {Array(5).fill().map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))} */}
            </div>
            <Rating
                name="simple-controlled"
                value={calificacion}
                size="small" 
                readOnly
            />

            <p className='descripcion'>{descripcion}</p>

            <div className='precio'>
                <span>${precio.toLocaleString("es-MX")}</span>
            </div>

            {/* <div className='delivery'>
                <img src="https://links.papareact.com/fdw" alt="" />
                <p className='text-xs text-gray-500'>Envío gratuito</p>
            </div> */}

            {/* Para verificar si está en el carrito se puede hacer uso de un Set */}
            { existencias > 0 ? <Button className='mt-auto' variant="primary" onClick={addToCart}> Añadir al carrito</Button> : <Chip label="Agotado" color="error" variant="outlined" /> }
            {/* <Button className='mt-auto' variant="primary"> Quitar del carrito</Button> */}
        </div>
    );
}
 
export default CardProducto;