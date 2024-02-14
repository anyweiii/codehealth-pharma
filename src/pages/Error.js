// [CODED BY: HUI ANGELES]
import { Container, Button } from 'react-bootstrap';

export default function ErrorPage() {
    return (
        <Container className="text-center mt-5">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Button variant="primary" href="/">Go to Home</Button>
        </Container>
    );
}
