import React, { useContext } from 'react'

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebaseConfig from '../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

import { AuthContext } from "../../context/AuthContext";

const RowCotización = ({producto, handleShowModal, setEditProductData}) => {

    const { user } = useContext(AuthContext);

    const arrayProducts = () => {

        let products = "";
        let cont = 1;
        (producto.products).forEach(product => {
            if(cont === (producto.products).length) {
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

        (producto.products).forEach(product => {
            totalAcumulado += parseInt(product.precio);
        });

        return totalAcumulado;
    }

    const editar = (producto) => {
        handleShowModal(producto);
    }

    const eliminar = async (id) => {
        await updateDoc(doc(db, "historialProcesos", id), {estado: 'eliminado'});
    }

    return (
        <tr key={producto.id}>
            <td>{producto.fecha}</td>
            <td>{arrayProducts()}</td>
            <td>{getMonto()}</td>
            <td>
                <IconButton onClick={() => editar(producto)}> <EditIcon/> </IconButton>
                <IconButton onClick={() => eliminar(producto.id)}> <DeleteIcon/> </IconButton>
            </td>
        </tr>
    )
}

export default RowCotización