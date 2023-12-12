import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

export default function EditAuthor({ author, updateAuthor }) {

    const [show, setShow] = useState(false);

    const [firstName, setFirstName] = useState(author.firstName)
    const [lastName, setLastName] = useState(author.lastName)
    const [emailAddress, setEmailAddress] = useState(author.emailAddress)
    const [description, setDescription] = useState(author.description)
    const [pictureURL, setPictureURL] = useState(author.pictureURL)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault() //prevent refresh

        updateAuthor({
            authorId: author.authorId, firstName: firstName, lastName: lastName,
            emailAddress: emailAddress, description: description, pictureURL: pictureURL
        })

        handleClose()
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Edit Author
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addModal" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                placeholder="John"
                                required
                                autoFocus
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Doe"
                                required
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="john.doe@gmail.com"
                                value={emailAddress}
                                onChange={(e) => {
                                    setEmailAddress(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea" rows={3}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridImageURL">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="https://www.google.ca"
                                value={pictureURL}
                                onChange={(e) => {
                                    setPictureURL(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="addModal" variant="primary" type="Submit">
                        Update Author
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}