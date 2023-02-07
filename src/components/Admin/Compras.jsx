import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Table from 'react-bootstrap/Table';

import data from '../../compras.json';

const Compras = () => {
    return (
        <div>
            <main>
                <div className="seccion">
                    <p className="titulo-seccion">Compras</p>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            
                        {data.map(venta => {
                            return (
                                <tr key={venta.id}>
                                    <td>{venta.usuario}</td>
                                    <td>{venta.producto}</td>
                                    <td>{venta.cantidad}</td>
                                    <td>{venta.fecha}</td>
                                    <td>{venta.total}</td>
                                </tr>
                            )
                        })}
                    
                        </tbody>
                    </Table>
                </div>
            </main>
        </div>
    );
}
 
export default Compras;