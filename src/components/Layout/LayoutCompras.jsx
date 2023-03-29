import TopBarCompras from './TopBarCompras';
import SidebarCompras from './SidebarCompras';
import { Outlet } from "react-router-dom";

const LayoutCompras = () => {
    return (
        <>
            <TopBarCompras/>
            <SidebarCompras/>
            <Outlet />
        </>
    );
}
 
export default LayoutCompras;