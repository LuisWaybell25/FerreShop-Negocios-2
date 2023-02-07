import './ListItemProducto.css';

const ListItemProducto = ({children, imagen, nombre, precio, categoria, descripcion}) => {
    return (
        <div className='card horizontal w-100'>
            <div className='img-contenedor'>
                <p className='categoria'>{categoria}</p>
                <img src={imagen} className='imagen'/>
            </div>

            <div className='info-contenedor'>
                <h4 className='title'>{nombre}</h4>

                <p className='descripcion'>{descripcion}</p>

                <div className='precio'>
                    <span>${precio.toLocaleString("es-MX")}</span>
                </div>

                <div className='acciones gap'>
                    {children}
                </div>

            </div>

        </div>
    );
}
 
export default ListItemProducto;