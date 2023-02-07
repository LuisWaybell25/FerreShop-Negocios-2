import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormValoracion = ({ datos, afterSubmitAction }) => {
    const [datosForm, setDatosForm] = useState(datos ?? {
        calificacion: 1,
        comentario: '',
    });

    const { calificacion, comentario } = datosForm;

    const actualizarInfoForm = (propiedad, valor) => {
        setDatosForm({
            ...datosForm,
            [propiedad]: valor
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        afterSubmitAction(datosForm);
    };
    
    return (
        <>
            <p className='m-none'>Calificación</p>
            <Rating
                name="simple-controlled"
                defaultValue={calificacion}
                onChange={(_, valor) => actualizarInfoForm('calificacion', valor)}
                // onChange={(event, newValue) => { setValue(newValue) }}
            />
            <Form>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Cuéntanos tu opinión</Form.Label>
                    <Form.Control 
                        maxLength={250} 
                        as="textarea" 
                        rows={5} 
                        defaultValue={comentario}
                        onChange={e => actualizarInfoForm('comentario', e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleSubmit}>Calificar</Button>
        </>
    );
}
 
export default FormValoracion;