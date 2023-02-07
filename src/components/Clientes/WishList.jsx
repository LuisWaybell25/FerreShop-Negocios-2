import React, { useState, useEffect } from 'react'
import BsButton from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ListItemProducto from './ListItemProducto';

import Swal from 'sweetalert2';

const WishList = () => {
    const existencias = 19;

    const [products, setProducts] = useState([]);

    const addToCart = (producto) => {

        const productsCart =  JSON.parse(localStorage.getItem('productsCart'));

        const productInfo = {
            id: producto.id,
            imagen: producto.imagen,
            nombre: producto.nombre, 
            precio: producto.precio,  
            categoria: producto.categoria, 
            existencias: producto.existencias,
            descripcion: producto.descripcion,
            resenia: producto.resenia
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

    useEffect(() => {
        const wishList =  JSON.parse(localStorage.getItem('wishList'));
        setProducts(wishList);

    }, []);
    
    const deleteProduct = (id) => {
        let newProducts = products.filter(producto => producto.id !== id);
        setProducts(newProducts);
        localStorage.setItem('wishList', JSON.stringify(newProducts));
    }

    return (
        <div className="seccion lista">

            {products.length < 1 ? (
                <p className="titulo-seccion">La lista de deseos está vacia</p>
            ) : (
                <>
                    <p className="titulo-seccion">Lista de deseos</p>

                    <div className='productos'>

                        {products.map(producto => {
                            return (
                                <ListItemProducto
                                    key={producto.id}
                                    imagen={producto.imagen}
                                    nombre={producto.nombre}
                                    precio={producto.precio}
                                    categoria={producto.categoria}
                                    descripcion={producto.descripcion}
                                >
                                    <Button color="error" sx={{ textTransform: 'none'}} onClick={() => deleteProduct(producto.id)}>Eliminar</Button>
                                    { existencias > 0 ? <BsButton className='mt-auto outline-none' variant="primary" onClick={() => addToCart(producto)}> Añadir al carrito</BsButton> : <Chip label="Agotado" color="error" variant="outlined" /> }
                                </ListItemProducto>
                            )
                        })}
                    </div>
                </>
            )}

        </div>
    );
}
 
export default WishList;