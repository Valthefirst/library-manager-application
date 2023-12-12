import { Container, Row } from "react-bootstrap"
import { useState, useEffect } from "react"
import AuthorCard from "./AuthorCard"
import AddAuthor from "./AddAuthor";
import { successToast, errorToast } from "../utils/toast";

export default function AuthorsList() {

    const [authors, setAuthors] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:8080/api/v1/authors", {
                method: "GET"
            });

            const authors = await response.json()
            setAuthors(authors)
            setIsLoading(false)
        })();
    }, []);

    if (isLoading) {
        return <div><h1>Loading...</h1></div>
    }

    //getAllAuthors
    function getAllAuthors() {
        (async () => {
            const response = await fetch("http://localhost:8080/api/v1/authors", {
                method: "GET"
            });

            const author = await response.json()
            setAuthors(author)
            setIsLoading(false)
        })();
    }

    function addAuthor(firstName, lastName, emailAddress, description, pictureURL) {

        var authorRequestDTO = {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            description: description,
            pictureURL: pictureURL
        }

        fetch(`http://localhost:8080/api/v1/authors`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authorRequestDTO)
        })
            .then(async response => {
                const isJson = response
                    .headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("Data is: " + data.firstName)

                if (response.status == 201) {
                    getAllAuthors()
                    successToast("Author added successfully")
                }

                //check for error
                if (!response.ok) {
                    const error = (data && data.message) ||
                        response.status;
                        console.log("POST error occured")
                        errorToast("Could not add the author")
                    return Promise.reject(error);
                }
            })
    }

    function updateAuthor(updateAuthor) {

        var authorRequestDTO = {
            firstName: updateAuthor.firstName,
            lastName: updateAuthor.lastName,
            emailAddress: updateAuthor.emailAddress,
            description: updateAuthor.description,
            pictureURL: updateAuthor.pictureURL
        }

        fetch(`http://localhost:8080/api/v1/authors/${updateAuthor.authorId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authorRequestDTO)
        })
            .then(async response => {
                const isJson = response
                    .headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("Data is: " + data.firstName)

                if (response.status == 200) {
                    getAllAuthors()
                    successToast("Update successful")
                }

                //check for error
                if (!response.ok) {
                    const error = (data && data.message) ||
                        response.status;
                        console.log("PUT error occured")
                        errorToast("Could not update the author")
                    return Promise.reject(error);
                }
            })
    }

    async function deleteAuthorHandler(authorId) {

        const response = await fetch(`http://localhost:8080/api/v1/authors/${authorId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');

                if (response.status == 204) {
                    getAllAuthors()
                    successToast("Author deleted successfully")
                }
                if (response.status == 422) {
                    getAllAuthors()
                    errorToast("This author still has book(s) accociated to it.")
                }
            })
            .catch(function (error) {
                console.log("an unknow error occured")
                return Promise.reject(error)
            })
    }

    return (
        <Container fluid>
            <AddAuthor addAuthor={addAuthor} />
            <Row sm={2} lg={4} className='justify-content-evenly'>
                {authors && authors.map((author) =>
                    <AuthorCard
                        key={author.authorId}
                        author={author}
                        updateAuthor={updateAuthor}
                        onDeleteAuthorHandler={deleteAuthorHandler} />
                )}
            </Row>
        </Container>
    )
}