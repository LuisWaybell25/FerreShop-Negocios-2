import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormUsuario = ({ datos, afterValidationAction, data, setData }) => {
    
    const [validated, setValidated] = useState(false);

    const [datosForm, setDatosForm] = useState(datos ?? {
        nombre: '',
        descripcion: '',
        rol: ''
    });

    const { correo, nombre, rol } = datosForm;

    const actualizarInfoForm = (propiedad, valor) => {
        setDatosForm({
            ...datosForm,
            [propiedad]: valor
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        
        setValidated(true);
        afterValidationAction(datosForm);
    };
    
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Correo"
                    aria-describedby="inputGroupPrepend"
                    required
                    defaultValue={correo}
                    onChange={e => actualizarInfoForm('correo', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                Por favor ingrese un correo válido.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre"
                    aria-describedby="inputGroupPrepend"
                    required
                    defaultValue={nombre}
                    onChange={e => actualizarInfoForm('nombre', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                Por favor ingrese un nombre.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                <Form.Label>Rol</Form.Label>
                <Form.Control required as="select" type="select" onChange={e => actualizarInfoForm('rol', e.target.value)} value={rol}>
                    <option value="">Seleccione un rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Por favor seleccione un rol.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Guardar</Button>
        </Form>
    );
}
 
export default FormUsuario;