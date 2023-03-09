import React, { useState, useEffect } from 'react'

import { getFirestore, collection, doc, setDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import firebaseConfig from '../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminRowCotizaciones = ({ proceso }) => {

    const eliminar = async (id) => {
        await updateDoc(doc(db, "historialProcesos", id), {estado: 'eliminado'});
    }

    const arrayProducts = () => {

        let products = "";
        let cont = 1;
        (proceso.products).forEach(product => {
            if(cont === (proceso.products).length) {
                products += product.nombre;
            } else {
                products += product.nombre + ",";
            }
            cont++;
        });
  
        return products
    }
  
    const getMonto = () => {
        let totalAcumulado = 0;
  
        (proceso.products).forEach(product => {
            totalAcumulado += parseInt(product.precio);
        });
  
        return totalAcumulado;
    }

    return (
        <tr key={proceso.id}>
            <td>{proceso.fecha}</td>
            <td>{proceso.userUid}</td>
            <td>{proceso.estado}</td>
            <td>{arrayProducts()}</td>
            <td>{getMonto()}</td>
            <td>
                <IconButton onClick={() => eliminar(proceso.id)}> <DeleteIcon/> </IconButton>
            </td>
        </tr>
    )
}

export default AdminRowCotizaciones;