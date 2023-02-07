import React from 'react';
// import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./TopBar.css";

import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const logout = () => {
        navigate("/login");
        localStorage.setItem('isLogged', false);
    }

    const usuario = 'Juan González'

    return (
        <nav className='navbar-admin z-depth-0'>
            <h1 className="navbar-admin-title black-text">{`Panel de administración`}</h1>
            <>
            </>
                
            <div className='navbar-admin-nav'>
                {/* <Avatar alt="foto de perfil" src="https://xsgames.co/randomusers/avatar.php?g=male" /> */}
                <p className='nombre' >{usuario}</p>
                <IconButton 
                    onClick={handleClick}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <ArrowDropDownIcon/>
                </IconButton>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {/* <MenuItem onClick={()=>{}}>Mi cuenta</MenuItem> */}
                <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
            </Menu>   
        </nav>
    );
}
 
export default TopBar;