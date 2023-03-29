import { BsCashCoin, BsPeople, BsViewStacked, BsBag, BsCalculator, BsPersonBadge, BsFileText, } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import './Sidebar.css';

const SidebarCompras = () => {

    return (
        <nav className='sidebar'>
            <ul className='sidebar-nav'>
                <div className="logo">
                    {/* <img src={logo} alt='logo'/> */}
                    <span className='link-text'>Ferreshop</span>
                </div>
                
                <li className='sidenav-item'>
                    <NavLink to="/consolacompras/compras" exact="true" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsCashCoin/>
                        <span className='link-text'>Compras</span>
                    </NavLink>
                </li>

                <li className='sidenav-item'>
                    <NavLink to="/consolacompras/informeventas" exact="true" className={({ isActive }) => isActive ? "active-link sidenav-link" : "sidenav-link"}>
                        <BsCalculator/>
                        <span className='link-text'>Informe de Ventas</span>
                    </NavLink>
                </li>
            </ul>
        </nav> 
    );
}
 
export default SidebarCompras;