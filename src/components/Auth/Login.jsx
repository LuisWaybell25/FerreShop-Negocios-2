import React, { useState, useEffect } from 'react'
// import axios from 'axios';

import TextField from '@mui/material/TextField';
// import Alert from '@mui/material/Alert';

import { useNavigate } from "react-router-dom";

import './Login.css';


const Login = () => {

    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    });

    const { email, password } = credenciales;
    
    const guardarInformacion = (propiedad, valor) => {
        setCredenciales({
            ...credenciales,
            [propiedad]: valor
        });
    }

    const navigate = useNavigate();

    const login = () => {
        
        
        if(email === "admin@gmail.com") {
            navigate("/consola");
            localStorage.setItem('isLogged', true);
        } else {
            navigate("/");
            localStorage.setItem('isLogged', true);
        }
    }

    return (
        <main className="contenedor bordered">
            
            <form className="login-contenedor" onSubmit={() =>  navigate("/")}>
                <div className="logo-login">
                    {/* <img src={logo} alt='logo'/> */}
                    <p className='text-logo'>Ferreshop</p>
                </div>
                <h1 className="titulo">Iniciar sesión</h1>
                <TextField 
                    sx={{
                        width: '92%',
                        margin:'0.5rem auto'
                    }}
                    type='email'
                    size="small"
                    margin="dense"
                    value={email} 
                    label="Ingrese su correo" 
                    fullWidth 
                    onChange={e => guardarInformacion('email', e.target.value)}
                    variant="outlined" 
                />
            
                <TextField 
                    sx={{
                        width: '92%',
                        margin:'1rem auto 0.25rem auto'
                    }}
                    type='password'
                    size="small"
                    margin="dense"
                    value={password} 
                    label="Contraseña" 
                    fullWidth
                    autoComplete="on" 
                    onChange={e => guardarInformacion('password', e.target.value)}
                    variant="outlined" 
                />
                <button className="btnLogin" type="submit" onClick={login}>Iniciar sesión</button>

                <p role="button" onClick={() => navigate("/registro")}>¿No tienes una cuenta? Registrate</p>
            </form>
        </main>
    );
}
 
export default Login;