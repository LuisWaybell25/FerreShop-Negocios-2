import React, { useState, useEffect } from 'react'
// import axios from 'axios';

import TextField from '@mui/material/TextField';
// import Alert from '@mui/material/Alert';

import { useNavigate } from "react-router-dom";

import './Login.css';

// Firebase 
import firebaseConfig from '../../utils/firebaseConfig';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseConfig);


const Login = () => {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if(user.email === "admin@gmail.com") {
                    navigate("/consola");
                } else if(user.email === "compras@gmail.com") {
                    navigate("/consolacompras");
                } else { 
                    navigate("/");
                }
            } else {
                navigate("/login");
            }
        });
    }, [])
    

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

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;
            if (user) {
                if(user.email === "admin@gmail.com") {
                    navigate("/consola");
                } else if(user.email === "compras@gmail.com") {
                    navigate("/consolacompras");
                } else { 
                    navigate("/");
                }
            } else {
                navigate("/login");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
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