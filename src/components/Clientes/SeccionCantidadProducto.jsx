import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import '../../App.css';

const SeccionCantidadProducto = ({limite, setTotal, precio, total, products, setProducts}) => {

    const [cantidad, setCantidad] = useState(1)

    const handleAdd = () => {
        

        //setProducts([...products, ])

        const totalAdd = parseInt(total) + parseInt(precio);
        setTotal(totalAdd);
        setCantidad(cantidad + 1);
    }

    const handleRemove = () => {
        const totalRemove = parseInt(total) - parseInt(precio);
        setTotal(totalRemove);
        setCantidad(cantidad - 1);
    }

    return (
        <div className='contenedor-flex gap align-center'>
            <p className='m-none'>Cantidad:</p>
            <div className='contenedor-flex gap align-center'>
                <Button className='mt-auto' variant="primary" disabled={cantidad <= 1} onClick={handleRemove}>
                    <BsDashLg/>
                </Button>
                <p className='m-none'>{cantidad}</p>
                <Button className='mt-auto' variant="primary" disabled={cantidad >= limite} onClick={handleAdd}>
                    <BsPlusLg/>
                </Button>
            </div>
        </div>
    );
}
 
export default SeccionCantidadProducto;