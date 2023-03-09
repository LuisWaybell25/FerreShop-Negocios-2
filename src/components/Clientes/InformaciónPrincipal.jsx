import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Button from 'react-bootstrap/Button';

import './Producto.css';

import Swal from 'sweetalert2';

import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import firebaseConfig from '../../utils/firebaseConfig'
const storage = getStorage(firebaseConfig);

const InformaciónPrincipal = ({id, imagen, nombre, precio, existencias, categoria, descripcion, calificacion, resenia}) => {
    const [favorito, setFavorito] = useState(false);

    const addToWishList = () => {

        const productsWishList =  JSON.parse(localStorage.getItem('wishList'));

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

        if(productsWishList !== null) {
            localStorage.setItem('wishList', JSON.stringify([...productsWishList, productInfo]));
        } else {
            localStorage.setItem('wishList', JSON.stringify([productInfo]));
        }
    }

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
        <div className="contenedor-informacion gap">
                <div className='img-contenedor'>
                    <img className='preview-image' src={image} alt="imagen libro" />
                </div>
                <div  className='info-contenedor'>
                    <div className='titulo-contenedor'>
                    <h1>{nombre}</h1>
                    <Checkbox 
                        icon={<FavoriteBorderIcon />} 
                        checkedIcon={<FavoriteIcon />}
                        checked={favorito}
                        onClick={addToWishList}
                        onChange={(e) => setFavorito(e.target.checked)}
                        sx={{
                            // color: '#dc3545',
                            '&.Mui-checked': {
                            color: '#dc3545',
                            },
                        }} 
                    />
                    </div>
                    <Rating
                        name="simple-controlled"
                        value={calificacion}
                        size="small" 
                        readOnly
                    />
                    <p className='seleccion-pasta'>Precio</p>
                    <h2 className='precio'>${precio.toLocaleString("es-MX")}</h2>

                    <Chip sx={{marginTop: "0.25rem"}} label={`${existencias > 0 ? "Disponible" : "Agotado"}`} color={`${existencias > 0 ? "primary" : "error"}`} variant="outlined" />
                    <p className='seleccion-pasta mb-2 mt-2'>Unidades disponibles: {existencias}</p>

                    { existencias > 0 ? <Button className='mt-auto' variant="primary" onClick={addToCart}> Añadir al carrito</Button> : null }

                </div>
            </div>
    );
}
 
export default InformaciónPrincipal;