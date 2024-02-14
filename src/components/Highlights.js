// [CODED BY: HUI ANGELES]
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col} from 'react-bootstrap';
import '../styles/Homepage/highlights.css';

export default function Highlights({data}) {
    const { label } = data;

    return (
        <>
        <Container fluid>
            <Row>
                <Col className='d-flex flex-lg-row flex-column'>
                    <Card className='product1 col-lg-4 col-12'>
                        <Card.Body>
                            <Card.Title className='card-highlights-title'>White Flower Medicated Ointment</Card.Title>
                                <Card.Text className='card-text-highlights'>
                                    For the temporary relief of minor aches and pains of muscles and joints associated with simple backache, sprains, bruises and strains.
                                </Card.Text>
                        </Card.Body>
                        <Link className="custom-btn" to="/products/65b2105d50a67d5bcbb24162">{label}</Link>
                    </Card>

                    <Card className='product2 col-lg-4 col-12'>
                        <Card.Body>
                            <Card.Title className='card-highlights-title'>Immunpro Sodium Ascorbate + Zinc</Card.Title>
                                <Card.Text className='card-text-highlights'>
                                    Assures the correct daily dose of Vitamin C and Zinc for increased body resistance and enhanced immune system.
                                </Card.Text>
                        </Card.Body>
                        <Link className="custom-btn" to="/products/65b2151750a67d5bcbb24185">{label}</Link>
                    </Card>

                    <Card className='product3 col-lg-4 col-12'>
                        <Card.Body>
                            <Card.Title className='card-highlights-title'>Allerta Loratadine</Card.Title>
                                <Card.Text className='card-text-highlights'>
                                    Used for the relief of symptoms associated with allergic rhinitis such as sneezing, runny, itchy nose, itchy and watery eyes, and skin symptoms of allergy such as itch and rash
                                </Card.Text>
                        </Card.Body>
                        <Link className="custom-btn" to="/products/65b215e650a67d5bcbb2418b">{label}</Link>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className='d-flex flex-lg-row flex-column'>
                    <Card className='product4 col-lg-6 col-12'>
                        <Card.Body>
                            <Card.Title className='card-highlights-title'>Cleene Cotton Balls</Card.Title>
                                <Card.Text className='card-text-highlights'>
                                     Cotton Balls are ideal for all types of minor wound care, as well as personal makeup application. Made of 100% absorbent cotton, they can be used to cleanse cuts, scratches, and scrapes without requiring excessive applications.
                                </Card.Text>
                        </Card.Body>
                        <Link className="custom-btn" to="/products/65b212cf50a67d5bcbb24174">{label}</Link>
                    </Card>

                    <Card className='product5 col-lg-6 col-12'>
                        <Card.Body>
                            <Card.Title className='card-highlights-title'>Enervon C Multivitamins</Card.Title>
                                <Card.Text className='card-text-highlights'>
                                    It contains B-complex vitamins (Vitamins B1, B2, B6, B12, Nicotinamide, and Calcium Pantothenate) to help optimize conversion of food into energy that the body can utilize for numerous physiologic processes such as respiration, digestion, blood circulation, immune system response, and as fuel for physical activities.
                                </Card.Text>
                        </Card.Body>
                        <Link className="custom-btn" to="/products/65b214bf50a67d5bcbb24182">{label}</Link>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
}