import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom"
import Button from 'react-bootstrap/Button';
import './ListItemProducto.css';

const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

import Swal from 'sweetalert2';

// jspdf library
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firebaseConfig from '../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

import { AuthContext } from "../../context/AuthContext";

import { v4 as uuidv4 } from "uuid";

import moment from 'moment';

const CardSubtotal = ({total, products}) => {

    const { user } = useContext(AuthContext);

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
            compra();
        });

        return actions.order.capture();
    };

    const compra = async () => {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let fecha;
        if(month < 10) {
            month = `0${month}`;
        } 
        if(day < 10) {
            day = `0${day}`;
        }
        fecha = `${day}-${month}-${date.getFullYear()}`;
        
        const proceso = {
            proceso: 'compra',
            products,
            fecha
        }

        // Historial
        const docProductosRef = doc(collection(db, "historialProcesos", user.uid, 'proceso'));
        await setDoc(docProductosRef, proceso);
    }

    const isBoldOpen = (arrayLength, valueBefore = false) => {
        const isEven = arrayLength % 2 === 0;
        const result = valueBefore !== isEven;
        return result;
    }

    const cotizar = async () => {

        const pdf = new JsPDF('portrait','pt','letter');
        let width = pdf.internal.pageSize.getWidth();

        // ****** PRIMERA PÁGINA ******* //

        // Refrerencia de margen
        //pdf.line(580, 0, 580, 500);

        // Fuente helvetica
        pdf.setFont("helvetica");

        // Color al dibujar
        pdf.setDrawColor(0, 0, 0);

        pdf.setFont(undefined, "bold").text("FerreShop", 34, 38);
        
        // Cambio de font size para la dirección y el teléfono
        pdf.setFontSize(9);

        // Agregar dirección con "Dirección" en negritas
        let startX = 194;
        let startY = 38;
        const lineSpacing = 14;
        const inputValue = `**Dirección:**Av. Adolfo López Mateos Ote. 1801, Bona Gens, 20256 Aguascalientes, Ags.`;
        const endX = 261;
        let textMap = pdf.splitTextToSize(inputValue,endX);
        const startXCached = startX;
        let boldOpen = false;
        textMap.map((text, i) => {
            if (text) {
                const arrayOfNormalAndBoldText = text.split('**');
                const boldStr = 'bold';
                const normalOr = 'normal';
                arrayOfNormalAndBoldText.map((textItems, j) => {
                    pdf.setFont(undefined, boldOpen ? normalOr : boldStr);
                    if (j % 2 === 0) {
                        pdf.setFont(undefined, boldOpen ? boldStr : normalOr);
                    }
                    pdf.text(textItems, startX, startY);
                    startX = startX + pdf.getStringUnitWidth(textItems) * 10;
                });
                boldOpen = isBoldOpen(arrayOfNormalAndBoldText.length, boldOpen);
                startX = startXCached;
                startY += lineSpacing;
            }
        });

        // Teléfono
        pdf.setFont(undefined, "bold").text("Teléfono:", 467, 38);
        pdf.setFont(undefined, "normal").text("449-263-4407", 515, 38);

        // Cambio de font size para lo que resta del pdf
        pdf.setFontSize(15);

        /*** DATOS GENERALES ***/
        pdf.setFont(undefined, "bold").text("COTIZACIÓN", width/2, 116, { align: 'center' });

        pdf.setFontSize(10);

        // obtener el nombre del mes, día del mes, año, hora
        let fecha = moment().format("DD/MM/YYYY HH:mm:ss A");

        // Fecha de la cotización
        pdf.setFont(undefined, "bold").text(fecha, width/2, 137, { align: 'center' });

        let arrayProducts = [];
        let monto = 0;
        products.forEach(product => {
            arrayProducts.push(['1', product.nombre, `$ ${product.precio}`, `$ ${product.precio}`])
            monto = monto + parseInt(product.precio);
        });

        if (arrayProducts.length < 12) {
            for (let index = arrayProducts.length; index < 14; index++) {
                arrayProducts.push(['', '', '', ''])
            }
        }

        arrayProducts.push(['', '', 'Total', `$ ${monto}`]);

        autoTable(pdf, {
            head: [['Cant.', 'Artículo', 'Precio', 'Importe']],
            body: arrayProducts,
            startY: 160,
            theme: 'grid',
            margin: { left: 34, right: 30 },
            headStyles:{
                valign: 'middle',
                halign : 'center',
                textColor: 255,
                lineColor: 0,
                fillColor: 0
            },
            bodyStyles: {
                valign: 'middle',
                halign: 'center',
                lineColor: 0,
                textColor: 0,
                fillColor: 255
            },
            styles: {
                valign: 'middle',
                halign: 'center',
                fontSize: 10,
                font: 'Helvetica'
            },
            columnStyles: { // Tamaño total 546
                0: {cellWidth: 46},
                1: {cellWidth: 250},
                2: {cellWidth: 125},
                3: {cellWidth: 125},
            }
        });

        const proceso = {
            proceso: 'cotización',
            products,
            fecha,
            estado: 'activo',
            userUid: user.uid,
        }

        // Historial
        const docProductosRef = doc(collection(db, "historialProcesos"));
        await setDoc(docProductosRef, proceso);

        // Guardar pdf
        pdf.save(`COTIZACIÓN.pdf`);
    }


    return (
        <div className="card subtotal">
            <h4 className='title'>Total: ${total}</h4>
            <Button color="primary" sx={{ textTransform: 'none'}} className='mb-3' onClick={cotizar}>Cotizar</Button> 
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </div>
    );
}
 
export default CardSubtotal;