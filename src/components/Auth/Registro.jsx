import TextField from '@mui/material/TextField';

import { useNavigate } from "react-router-dom";

import './Login.css';


const Registro = () => {

    const navigate = useNavigate();

    const register = () => {
        navigate("/");
        localStorage.setItem('isLogged', true);
    }

    return (
        <main className="contenedor">
            <form className="login-contenedor" onSubmit={() =>  navigate("/")}>
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
                    type='email'
                    size="small"
                    margin="dense"
                    // value={email} 
                    label="Ingrese su correo" 
                    fullWidth 
                    // onChange={() =>  navigate("/")}
                    variant="outlined" 
                />
                
                <TextField 
                    sx={{
                        width: '92%',
                        margin:'0.5rem auto'
                    }}
                    type='text'
                    size="small"
                    margin="dense"
                    // value={nombre} 
                    label="Ingrese su nombre" 
                    fullWidth 
                    // onChange={e => guardarInformacion('nombre', e.target.value)}
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
                    // value={password} 
                    label="Contraseña" 
                    fullWidth
                    // autoComplete="on" 
                    // onChange={e => guardarInformacion('password', e.target.value)}
                    variant="outlined" 
                />
                <button className="btnLogin" type="submit" onClick={register}>Registrarse</button>

                <p role="button" onClick={() => navigate("/login")}>Inicar Sesión</p>
            </form>
        </main>
    );
}
 
export default Registro;