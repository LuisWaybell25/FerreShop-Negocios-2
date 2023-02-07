import React, {useState, useEffect} from 'react';

import { Navbar, Form, Dropdown, DropdownButton } from 'react-bootstrap';

import CarruselImg from './CarruselImg';
import CardProducto from './CardProducto';

import './ListaProductos.css';

import banner1 from '../../assets/img/M1D.png';
import banner2 from '../../assets/img/M2D.png';
import banner3 from '../../assets/img/M3D.png';

import banner4 from '../../assets/img/M1M.png';
import banner5 from '../../assets/img/M2M.png';
import banner6 from '../../assets/img/M3M.png';


import '../../App.css';

import data from '../../productos.json';
import datosCategorias from '../../categorias.json';

import { useMediaQuery } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import './home.css';

const Home = () => {
    
    const [products, setProducts] = useState([])
    const [imagenesCarrusel, setImagenesCarrusel] = useState([])
    const [busqueda, setBusqueda] = useState('');
    const [terminoCategoria, setTerminoCategoria] = useState('')
    const matches = useMediaQuery('(max-width: 767px)');
    const navigate = useNavigate();

    useEffect(() => {

        setProducts(data);

        const logged =  JSON.parse(localStorage.getItem('isLogged'));

        if(logged === false) {
            navigate("/login");
        }
        
        if(matches) {
            setImagenesCarrusel([banner4,banner5,banner6]);
        } else {
            setImagenesCarrusel([banner1,banner2,banner3]);
        }

    }, [matches])

    const handleInputChangeBusqueda = (event) => {
        setBusqueda(event.target.value)
    }

    const search = (busqueda) => {
        return (item) => {
            return item.nombre.toLowerCase().includes(busqueda.toLowerCase());
        }
    }

    const onChangeCategoria = (e) => {
        setTerminoCategoria(e.target.value);

        if(e.target.value === "Todo") {
            setProducts(data);
        } else {
            let newProducts = data.filter(producto => producto.categoria === e.target.value);
            setProducts(newProducts);
        }
    }
    const hideCookieContainer = (e) =>{
        document.getElementById('cookieContainer').style.display = 'none';
    }

    function sortJSON(data, key, orden) {
        return data.sort(function (a, b) {
            var x = a[key],
            y = b[key];
    
            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
    
            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }

    const onChangePrecio = (e) => {

        const copy = [...products];

        if(e.target.value === "mayor") {
            var oJSON = sortJSON(copy, 'precio', 'desc');
            setProducts(oJSON);
        } else if(e.target.value === "menor") {
            var oJSON = sortJSON(copy, 'precio', 'asc');
            setProducts(oJSON);
        }
    }

    return (
        <>
            <CarruselImg imagenes={imagenesCarrusel}/>
            <div className='seccion'>

                <div className='p-3 w-100'>
                    <Form>
                        <Row xs={1} className="g-4">
                            <Col sm={6}>
                                <Form.Control type="text" placeholder="Buscar por nombre" className="search-bar" onChange={handleInputChangeBusqueda}/>
                            </Col>
                            <Col sm={3}>
                                <Form.Select 
                                    className='w-100' 
                                    onChange={onChangeCategoria}
                                    aria-label="Default select example"
                                >
                                    <option>- Seleccione una categoría -</option>
                                    <option value="Todo">Todo</option>
                                    {datosCategorias.map(categorias => {
                                        return (
                                            <option key={categorias.id} value={categorias.nombre}>{categorias.nombre}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Col>
                            <Col sm={3}>
                                <Form.Select 
                                    className='w-100' 
                                    onChange={onChangePrecio}
                                    aria-label="Default select example"
                                >
                                    <option>- Seleccione un filtro -</option>
                                    <option value="mayor">Mayor precio</option>
                                    <option value="menor">Menor precio</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form>
                </div>
                
                <div className='lista-grid'>

                    {products.filter(search(busqueda)).map(producto => {
                        return (
                            <CardProducto 
                                key={producto.id}
                                id={producto.id}
                                imagen={producto.imagen}
                                nombre={producto.nombre}
                                precio={producto.precio}
                                existencias={producto.existencias}
                                categoria={producto.categoria}
                                descripcion={producto.descripcion}
                                calificacion={producto.calificacion}
                                resenia={producto.resenia}
                            />
                        )
                    })}
                </div>
            </div>
            
            <div className="cookie-banner-container" id='cookieContainer'>
                <h3 className="title">Cookies</h3>
                <p className="cookie-info">Algunas cookies son necesarias para fines técnicos, por lo que están exentas de consentimiento. Otras, no obligatorias, pueden utilizarse para anuncios y contenidos personalizados, medición de anuncios y contenidos, conocimiento de la audiencia y desarrollo de productos, datos precisos de geolocalización e identificación a través del escaneo de dispositivos, almacenar y/o acceder a información en un dispositivo.</p>
                <p role="button" className="confirm-button" onClick={hideCookieContainer}>Aceptar Cookies</p>
                <Link to='cookies' >Revisar Politica de Cookies</Link>
            </div>
        </>
    );
}
 
export default Home;