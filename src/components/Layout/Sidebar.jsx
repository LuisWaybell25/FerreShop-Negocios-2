import { BsCashCoin, BsPeople, BsViewStacked, BsBag, BsCalculator, BsPersonBadge, BsFileText, } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {

    return (
        <nav className='sidebar'>
            <ul className='sidebar-nav'>
                <div className="logo">
                    {/* <img src={logo} alt='logo'/> */}
                    <span className='link-text'>Ferreshop</span>
                </div>
                <li className='sidenav-item'>
                    <NavLink to="/consola/cotizaciones" exact="true" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsCalculator/>
                        <span className='link-text'>Cotizaciones</span>
                    </NavLink>
                </li>

                <li className='sidenav-item'>
                    <NavLink to="/consola/compras" exact="true" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsCashCoin/>
                        <span className='link-text'>Compras</span>
                    </NavLink>
                </li>
                <li className='sidenav-item'>
                    <NavLink to="/consola/productos" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsBag/>
                        <span className='link-text'>Productos</span>
                    </NavLink>
                </li>
                <li className='sidenav-item'>
                    <NavLink to="/consola/categorias" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsViewStacked/>
                        <span className='link-text'>Categorías</span>
                    </NavLink>
                </li>
                <li className='sidenav-item'>
                    <NavLink to="/consola/usuarios" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsPeople/>
                        <span className='link-text'>Usuarios</span>
                    </NavLink>
                </li>
            </ul>
        </nav> 
    );
}
 
export default Sidebar;