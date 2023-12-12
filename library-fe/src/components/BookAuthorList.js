import { useLocation } from 'react-router-dom'
import AuthorCard from './AuthorCard';
import { Container, Row } from 'react-bootstrap';

export default function BookAuthorList() {

    const { state } = useLocation();

    return (
        <Container fluid className="p-4">
            <Row sm={2} lg={4} className='justify-content-evenly'>
                <AuthorCard author={state.author} />
            </Row>
        </Container>
    )
}
