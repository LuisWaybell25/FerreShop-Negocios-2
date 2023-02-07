import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormCategoria = ({ datos, afterValidationAction, data, setData }) => {
    
    const [validated, setValidated] = useState(false);

    const [datosForm, setDatosForm] = useState(datos ?? {
        nombre: '',
        descripcion: '',
    });

    const { nombre, descripcion } = datosForm;

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
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre"
                    aria-describedby="inputGroupPrepend"
                    required
                    maxLength={45}
                    defaultValue={nombre}
                    onChange={e => actualizarInfoForm('nombre', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                Por favor ingrese un nombre.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3"controlId="exampleForm.ControlTextarea1">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="(Opcional)" 
                    rows={5} 
                    maxLength={150}
                    defaultValue={descripcion}
                    onChange={e => actualizarInfoForm('descripcion', e.target.value)}
                />
            </Form.Group>
            <Button type="submit">Guardar</Button>
        </Form>
    );
}
 
export default FormCategoria;