import React, { useState, useEffect } from 'react'
// import axios from 'axios';

import TextField from '@mui/material/TextField';
// import Alert from '@mui/material/Alert';

import { useNavigate } from "react-router-dom";

import './Perfil.css';
import { Button, Card, ListGroup, Row, Col, Image, Container } from 'react-bootstrap';
import { height } from '@mui/system';

import { Link } from "react-router-dom";

const Perfil = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <Col className='col-12 col-md-4'>
                    <h1 className="titulo mt-5">Mi perfil</h1> 
                    <div><Image width={80} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" /></div>
                    
                    <Row className='justify-content-center'>
                        <Button as={Link} to={`/mis_compras`} variant="outline-primary" className='myBtn mt-4'>Mis compras</Button>
                        <Button as={Link} to={`/wishlist`} variant="outline-primary" className='myBtn mt-4'>Lista de deseos</Button>

                        <Card style={{ width: '90%' }} className=" mt-4">
                            <Card.Body>
                                <Card.Title>Datos de la cuenta</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><a href=''>Actualizar Datos Personales</a></ListGroup.Item>
                                    <ListGroup.Item><a href=''>Actualizar Datos de Envio</a></ListGroup.Item>
                                    <ListGroup.Item><a href=''>Actualizar Contraseña</a></ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>

                <Col className='columna2 mt-5'>
                    <Row className='justify-content-center'>
                    <Card style={{ width: '90%'}} >
                            <Card.Body>
                                <Card.Title><h1>Tu Información</h1></Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><p className='fw-bold'>Nombre</p><p>Luis Fernando</p></ListGroup.Item>
                                    <ListGroup.Item><p className='fw-bold'>Apellido</p><p>Jasso Frausto</p></ListGroup.Item>
                                    <ListGroup.Item><p className='fw-bold'>Telefono</p><p>449-467-0443</p></ListGroup.Item>
                                    <ListGroup.Item><p className='fw-bold'>Correo</p><p>luis.f.jasso22@gmail.com</p></ListGroup.Item>
                                    <ListGroup.Item><p className='fw-bold'>Direccion de Entrega</p><p>Prol. Gobernantes #702, Colinas de Oriente CP:20174</p></ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
            </Row>
            
        </Container>

    );
}

export default Perfil;