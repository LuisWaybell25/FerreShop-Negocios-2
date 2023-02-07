import Carousel from 'react-bootstrap/Carousel';

const CarruselImg = ({imagenes}) => {
    return (
        <Carousel>
            {imagenes.map((img, index) => (
                <Carousel.Item key={`${index}-img-banner`}>
                    <img className="d-block w-100" src={img} alt={`${index} slide`} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
 
export default CarruselImg;