import React, { useState, useEffect } from 'react'

import Button from '@mui/material/Button';

import SeccionCantidadProducto from './SeccionCantidadProducto';
import CardSubtotal from './CardSubtotal';
import ListItemProducto from './ListItemProducto';

const Carrito = () => {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const productsCart =  JSON.parse(localStorage.getItem('productsCart'));
        setProducts(productsCart);

        let totalAcumulado = 0;

        productsCart.map((product) => {
            totalAcumulado += product.precio;
        });
        setTotal(parseInt(totalAcumulado));

    }, []);
    
    const deleteProduct = (id) => {
        let newProducts = products.filter(producto => producto.id !== id);
        let totalAcumulado = 0;

        newProducts.map((product) => {
            totalAcumulado += product.precio;
        });
        setTotal(parseInt(totalAcumulado));
        setProducts(newProducts);
        localStorage.setItem('productsCart', JSON.stringify(newProducts));
    }

    return (
        <div className="seccion lista">

            {products.length < 1 ? (
                <p className="titulo-seccion">El carrito está vacio</p>
            ) : (
                <>
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
                                    <Button color="error" sx={{ textTransform: 'none'}} onClick={(e) => {deleteProduct(producto.id)}}>Eliminar</Button> 
                                    <SeccionCantidadProducto 
                                        setTotal={setTotal}
                                        limite={producto.existencias}
                                        precio={producto.precio}
                                        total={total}
                                    />
                                </ListItemProducto>
                            )
                        })}
                    </div>
                    <div className='total'>
                        <CardSubtotal
                            total={total.toLocaleString("es-MX")}
                        />
                    </div>
                </>
            )}

        </div>
    );
}
 
export default Carrito;