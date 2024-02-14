// [CODED BY: HUI ANGELES]
import { Link } from 'react-router-dom';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import '../styles/Homepage/banner.css';

export default function Banner({data}) {
    const { title, content, destination, label } = data;

    return (
        <Container fluid className='p-0 overflow-hidden'>
            <Row>
                <Col className='p-0 mb-5'>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="banner-1 d-block w-100"
                                src={require('../styles/Homepage/images/banner-img1.jpg')}
                                alt="First slide"
                            />
                            <Carousel.Caption className="custom-carousel-caption">
                                <h1 className='banner-title'>{title}</h1>
                                <p className='banner-description'>{content}</p>
                                <Link className="button-banner" to={destination}>{label}</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require('../styles/Homepage/images/banner-img2.jpg')}
                                alt="Second slide"
                            />
                            <Carousel.Caption className="custom-carousel-caption">
                                <h1 className='banner-title'>{title}</h1>
                                <p className='banner-description'>{content}</p>
                                <Link className="button-banner" to={destination}>{label}</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require('../styles/Homepage/images/banner-img3.jpg')}
                                alt="Third slide"
                            />
                            <Carousel.Caption className="custom-carousel-caption">
                                <h1 className='banner-title'>{title}</h1>
                                <p className='banner-description'>{content}</p>
                                <Link className="button-banner" to={destination}>{label}</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}