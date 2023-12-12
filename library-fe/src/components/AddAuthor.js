import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

export default function AddAuthor({ addAuthor }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault() //prevent refresh

        // if pictureURL is null, add default image
        var url = "https://th.bing.com/th/id/R.64ed949e4bc2e702f7fafa3415e1df76?rik=FWCoLrReRMwU1Q&pid=ImgRaw&r=0"
        if (event.target[4].value && event.target[4].value !== "") {
            url = event.target[4].value;
        }

        console.log(event.target[0].value)
        console.log(event.target[1].value)
        console.log(event.target[2].value)
        console.log(event.target[3].value)
        console.log(event.target[4].value)
        
        addAuthor(event.target[0].value, event.target[1].value, event.target[2].value,
            event.target[3].value, url)

        handleClose()
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add Author
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addModal" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John"
                                required
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Doe"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="john.doe@gmail.com"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="addModal" variant="primary"type="Submit">
                        Add Author
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
