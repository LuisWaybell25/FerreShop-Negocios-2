import React, { useState, useEffect } from 'react'

import { getFirestore, collection, doc, setDoc, onSnapshot, query, getDocs  } from "firebase/firestore";
import firebaseConfig from '../../utils/firebaseConfig';
const db = getFirestore(firebaseConfig);

import Table from 'react-bootstrap/Table';

import AdminRowCotizaciones from './AdminRowCotizaciones';

const AdminCotizaciones = () => {

  const [procesos, setProcesos] = useState([]);

  const getProcesos = async () => {

      const q = query(collection(db, "historialProcesos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            
            const arrayProcesos = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                arrayProcesos.push(data);
            });
            
            setProcesos(arrayProcesos);
            
        });

        return () => {
            unsubscribe()
        }
  }

  useEffect(() => {
      getProcesos();
  }, [])
  
  return (
    <div>
      <main>
          <div className="seccion">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Fecha y Hora</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Productos</th>
                        <th>Monto</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>

                    {procesos.map(proceso => {
                        return (
                            <AdminRowCotizaciones key={proceso.id} proceso={proceso} />
                        )
                    })}
                </tbody>
            </Table>
          </div>
        </main>
    </div>
  )
}

export default AdminCotizaciones