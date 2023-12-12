import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import EditAuthor from "./EditAuthor";

export default function AuthorCard({ author, updateAuthor, onDeleteAuthorHandler }) {

    const onDelete = () => {
        onDeleteAuthorHandler(author.authorId)
    }

    return (
        <div className="p-3" type="button">
            <Card className="card" style={{ width: '18rem' }}>
                <LinkContainer to="/authorbooks" state={{ authorId: author.authorId }} >
                    <Card.Img src={author.pictureURL} />
                </LinkContainer >
                <Card.Body>
                    <Card.Title>{author.firstName} {author.lastName}</Card.Title>
                    <Card.Text>
                        <strong>Description: </strong>{author.description}
                    </Card.Text>
                    {window.location.pathname === "/authors" &&
                        <>
                            <EditAuthor author={author} updateAuthor={updateAuthor} />
                            <Button variant="danger" onClick={onDelete}> Delete </Button>
                        </>
                    }
                </Card.Body>
            </Card>

        </div>
    )
}