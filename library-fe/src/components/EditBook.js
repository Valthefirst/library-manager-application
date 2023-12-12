import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

export default function EditBook(props) {

    const { book, updateBook, authorOptions } = props

    const [show, setShow] = useState(false);

    const [isbn, setISBN] = useState(book.isbn)
    const [title, setTitle] = useState(book.title)
    const [collection, setCollection] = useState(book.collection)
    const [edition, setEdition] = useState(book.edition)
    const [publisher, setPublisher] = useState(book.publisher)
    const [synopsis, setSynopsis] = useState(book.synopsis)
    const [pictureURL, setPictureURL] = useState(book.pictureURL)
    const [authorName, setAuthorName] = useState(book.author.firstName && book.author.lastName)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault() //prevent refresh

        //get authorId
        var author = authorOptions.find(author =>
            author.lastName === event.target[7].value)

        updateBook({
            bookId: book.bookId, isbn: isbn, title: title, collection: collection, edition: edition,
            publisher: publisher, synopsis: synopsis, pictureURL: pictureURL, author: author
        })

        handleClose()
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Edit Book
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addmodal" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGridISBN">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                type="text"
                                value={isbn}
                                placeholder="Book's ISBN"
                                required
                                onChange={(e) => {
                                    setISBN(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                placeholder="Book Name"
                                required
                                autoFocus
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridCollection">
                            <Form.Label>Collection</Form.Label>
                            <Form.Control
                                type="text"
                                value={collection}
                                placeholder="Collection Name"
                                onChange={(e) => {
                                    setCollection(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridEdition">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control
                                type="number"
                                value={edition}
                                placeholder="Edition Number"
                                onChange={(e) => {
                                    setEdition(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridPublisher">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control
                                type="text"
                                value={publisher}
                                placeholder="Publisher's Name"
                                onChange={(e) => {
                                    setPublisher(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridSynopsis">
                            <Form.Label>Synopsis</Form.Label>
                            <Form.Control
                                type="text"
                                value={synopsis}
                                as="textarea" rows={3}
                                onChange={(e) => {
                                    setSynopsis(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridImageURL">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                value={pictureURL}
                                onChange={(e) => {
                                    setPictureURL(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Select
                                required value={authorName}
                                onChange={(e) => {
                                    setAuthorName(e.target.value)
                                }}>
                                <option>Choose...</option>
                                {authorOptions && authorOptions.map((author, i) => {
                                    return (
                                        <option key={i} value={author.lastName}>
                                            {author.firstName} {author.lastName}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="addmodal" variant="primary" type="Submit">
                        Update Book
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
