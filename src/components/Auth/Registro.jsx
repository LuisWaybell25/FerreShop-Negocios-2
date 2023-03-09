import React, { useState } from 'react'

import TextField from '@mui/material/TextField';

import { useNavigate } from "react-router-dom";

import './Login.css';

// Firebase 
import firebaseConfig from '../../utils/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
const auth = getAuth(firebaseConfig);

const Registro = () => {

    const navigate = useNavigate();

    const [credenciales, setCredenciales] = useState({
        email: '',
        name: '',
        password: ''
    });

    const { email, name, password } = credenciales;
    
    const onChangeCredenciales = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                navigate('/');
            }).catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <main className="contenedor">
            <form className="login-contenedor">
                <div className="logo-login">
                    {/* <img src={logo} alt='logo'/> */}
                    <p className='text-logo'>Ferreshop</p>
                </div>
                <h1 className="titulo">Registro</h1>
                <TextField 
                    sx={{
                        width: '92%',
                        margin:'0.5rem auto'
                    }}
                    name='email'
                    type='email'
                    size="small"
                    margin="dense"
                    value={email} 
                    label="Ingrese su correo" 
                    fullWidth 
                    onChange={onChangeCredenciales}
                    variant="outlined" 
                />
                
                <TextField 
                    sx={{
                        width: '92%',
                        margin:'0.5rem auto'
                    }}
                    name='name'
                    type='text'
                    size="small"
                    margin="dense"
                    value={name} 
                    label="Ingrese su nombre" 
                    fullWidth 
                    onChange={onChangeCredenciales}
                    variant="outlined" 
                />
            
                <TextField 
                    sx={{
                        width: '92%',
                        margin:'1rem auto 0.25rem auto'
                    }}
                    name='password'
                    type='password'
                    size="small"
                    margin="dense"
                    value={password} 
                    label="Contraseña" 
                    fullWidth
                    onChange={onChangeCredenciales}
                    variant="outlined" 
                />
                <button className="btnLogin" onClick={register}>Registrarse</button>

                <p role="button" onClick={() => navigate("/login")}>Inicar Sesión</p>
            </form>
        </main>
    );
}
 
export default Registro;