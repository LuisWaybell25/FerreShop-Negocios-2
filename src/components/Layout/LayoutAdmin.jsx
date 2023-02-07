import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
    return (
        <>
            <TopBar/>
            <Sidebar/>
            <Outlet />
        </>
    );
}
 
export default LayoutAdmin;