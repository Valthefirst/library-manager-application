import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import BookCard from "./BookCard";
import { useLocation } from 'react-router-dom';

export default function AuthorBooksList() {

    const { state } = useLocation();

    const [books, setBooks] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:8080/api/v1/authors/${state.authorId}/books`, {
                method: "GET"
            });
            const result = await response.json()
            const books = result.books
            setBooks(books)
            setIsLoading(false)
        })();
    }, []);

    if (isLoading) {
        return <div><h1>Loading...</h1></div>
    }

    return (
        <Container fluid className="p-4">
            <Row sm={2} lg={4} className='justify-content-evenly'>
                {books && books.map((book) =>
                    <BookCard key={book.bookId} book={book} />
                )}
            </Row>
        </Container>
    )
}
