import { Outlet  } from "react-router-dom";

import '../../App.css';

const Productos = () => {
    return (
        <div className="seccion">
            {/* <h2>Categoría:</h2> */}
            <Outlet />
        </div>
    );
}
 
export default Productos;