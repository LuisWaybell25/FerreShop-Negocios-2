import { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';

import './DragDropImage.css';

const DragDropImage = ({imagen, setImagen}) => {
    // state de arrastre
    const [dragActive, setDragActive] = useState(false);
    // Referencia al input
    const inputRef = useRef(null);
    
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation(); 
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // cuando se suelta el archivo
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files.length > 0 && e.dataTransfer.files[0]) 
            setImagen(e.dataTransfer.files[0])
    };

    // cuando se selecciona el archivo con un click
    const handleChange = function(e) {
        e.preventDefault();
        console.log(e.target.files[0]);
        if (e.target.files.length > 0 && e.target.files[0]) 
            setImagen(e.target.files[0])
    };

    // Redirige el clic del botón hacia el input
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <Form.Control
                type="file"
                placeholder="Imagen"
                aria-describedby="inputGroupPrepend"
                required={!imagen}
                accept='image/*'
                ref={inputRef}
                className="input-file-upload"
                // id="input-file-upload"
                onChange={handleChange} 
            />
            {imagen 
                ? 
                <div className={dragActive ? "drag-active dragImageContainer" : "dragImageContainer" } onClick={onButtonClick} >
                    <img className="image-preview" src={typeof imagen === 'object' ? URL.createObjectURL(imagen) : imagen} alt="imagen producto" onDragEnter={handleDrag} /> 
                    <div className='layer' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>
                </div>
                : 
                <label /* htmlFor="input-file-upload" */ onDragEnter={handleDrag} className={dragActive ? "drag-active label-file-upload" : "label-file-upload" }>
                    <div>
                        <p>Arrastra y suelta la foto aquí o</p>
                        <button type='button' className="upload-button" onClick={onButtonClick}>Selecciona una foto</button>
                    </div> 
                    { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                </label>
            }
        </>
    );
}
 
export default DragDropImage;