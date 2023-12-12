import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import EditBook from "./EditBook";

export default function BookCard(props) {

    const { book, updateBook, authorOptions, onDeleteBookHandler } = props

    const onDelete = () => {
        onDeleteBookHandler(book.isbn)
    }

    return (
        <div className="p-3" type="button">
            <Card className="card" style={{ width: '18rem' }}>
                <LinkContainer to="/bookauthor" state={book} >
                    <Card.Img src={book.pictureURL} />
                </LinkContainer >
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                        <strong>Collection: </strong> {book.collection}
                    </Card.Text>
                    {window.location.pathname === "/books" &&
                        <>
                            <EditBook book={book} updateBook={updateBook}
                                authorOptions={authorOptions} />
                            <Button variant="danger" onClick={onDelete}> Delete </Button>
                        </>
                    }
                </Card.Body>
            </Card>
        </div>
    )
} 