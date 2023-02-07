import { Outlet  } from "react-router-dom";

const Categorias = () => {
    return (
        <div>
            {/* <h2>Categoría:</h2> */}
            <Outlet />
        </div>
    );
}
 
export default Categorias;