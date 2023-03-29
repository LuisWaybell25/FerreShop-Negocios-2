import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import LayoutTienda from './components/Layout/LayoutTienda'
import LayoutAdmin from './components/Layout/LayoutAdmin'
import LayoutCompras from './components/Layout/LayoutCompras'
import Home from './components/Clientes/Home'
import Categorias from './components/Clientes/Categorias';
import Carrito from './components/Clientes/Carrito';
import Categoria from './components/Clientes/Categoria';
import Login from './components/Auth/Login';
import Registro from './components/Auth/Registro';
import WishList from './components/Clientes/WishList';
import MisCompras from './components/Clientes/MisCompras';
import Productos from './components/Clientes/Productos';
import Producto from './components/Clientes/Producto';
import Compras from './components/Admin/Compras';
import AdminCategorias from './components/Admin/AdminCategorias';
import AdminProductos from './components/Admin/AdminProductos';
import Usuarios from './components/Admin/Usuarios';
import PoliticaCookies from './components/Clientes/PoliticaCookies'
import Perfil from './components/Clientes/Perfil'
import Cotizaciones from './components/Clientes/Cotizaciones'
import AdminCotizaciones from './components/Admin/AdminCotizaciones'
import InformeVentas from './components/Admin/InformeVentas'

import 'bootstrap/dist/css/bootstrap.min.css';

import AuthProvider from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
        <div className='App'>
            <Routes>
                <Route exact path='/' element={<LayoutTienda/>}>
                    <Route index element={<Home/>} />

                    <Route path='cookies' element={<PoliticaCookies/>} />
                    <Route path="categorias" element={<Categorias />}>
                        <Route path=":categoriaId" element={<Categoria />} />
                    </Route>
                    <Route path="producto" element={<Productos />}>
                        <Route path=":id" element={<Producto />} />
                    </Route>
                    <Route path='carrito' element={<Carrito/>} />
                    <Route path='cotizaciones' element={<Cotizaciones/>} />
                    <Route path='wishlist' element={<WishList/>} />
                    <Route path='mis_compras' element={<MisCompras/>} />
                    <Route path='perfil' element={<Perfil/>} />
                </Route>

                <Route exact path='consolacompras' element={<LayoutCompras/>}>
                    <Route path='compras' element={<Compras/>} />
                    <Route path='informeventas' element={<InformeVentas/>} />
                </Route>

                <Route exact path='consola' element={<LayoutAdmin/>}>
                    <Route index element={<AdminCotizaciones/>} />
                    <Route path='cotizaciones' element={<AdminCotizaciones/>} />
                    <Route path='compras' element={<Compras/>} />
                    <Route path='compras' element={<Compras/>} />
                    <Route path='productos' element={<AdminProductos/>} />
                    <Route path='categorias' element={<AdminCategorias/>} />
                    <Route path='usuarios' element={<Usuarios/>} />
                </Route>

                <Route exact path='login' element={<Login/>} />
                <Route exact path='registro' element={<Registro/>} />
            </Routes>
        </div>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
