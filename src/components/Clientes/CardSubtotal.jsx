import React, {useEffect} from "react";
import ReactDOM from "react-dom"
import Button from 'react-bootstrap/Button';
import './ListItemProducto.css';

const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

import Swal from 'sweetalert2';

const CardSubtotal = ({total}) => {


    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
            {
                amount: {
                value: parseInt(total.replaceAll(',','')),
                },
            },
            ],
        });
    };

    const onApprove = (data, actions) => {
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
            
        });

        return actions.order.capture();
    };

    return (
        <div className="card subtotal">
            <h4 className='title'>Total: ${total}</h4>
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </div>
    );
}
 
export default CardSubtotal;