import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

export default function AddBook({ addBook, authorOptions }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault() //prevent refresh

        // if pictureURL is null,  add default image
        var url = "https://thumbs.dreamstime.com/b/generic-closed-book-brown-blank-cover-isolated-background-40847453.jpg"
        if (event.target[6].value && event.target[6].value != "") {
            url = event.target[6].value;
        }

        //get authorId
        var author = authorOptions.find(author => 
            author.firstName === event.target[7].value)

        addBook(event.target[0].value, event.target[1].value, event.target[2].value, 
            event.target[3].value, event.target[4].value, event.target[5].value, url, author.authorId)

        handleClose()
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add Book
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addmodal" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGridISBN">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Book's ISBN"
                                required
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Book Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridCollection">
                            <Form.Label>Collection</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Collection Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridEdition">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Edition Number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridPublisher">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Publisher's Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridSynopsis">
                            <Form.Label>Synopsis</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea" rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridImageURL">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="https://www.google.ca"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Select required defaultValue="Choose...">
                                <option>Choose...</option>
                                {authorOptions && authorOptions.map((author, i) => {
                                    return (
                                        <option key={i} value={author.firstName}>
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
                        Add Book
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
