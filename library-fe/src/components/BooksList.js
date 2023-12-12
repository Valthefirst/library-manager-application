import { Container, Row } from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import BookCard from "./BookCard"
import AddBook from "./AddBook";
import { errorToast, successToast } from "../utils/toast";

// let books =[
//     {
//         "isbn": "2895490848",
//         "title": "Le porteur de masques",
//         "collection": "Amos Daragon",
//         "edition": "1st",
//         "publisher": "Les Inthouchables",
//         "synopsis": "x",
//         "pictureURL": "https://images.noosfere.org/couv/I/Intouchables084-2003.jpg"
//     },
//     {
//         "isbn": "2895490880",
//         "title": "La clé de Braha",
//         "collection": "Amos Daragon",
//         "edition": "1st",
//         "authorId": "e9e8b390-cdba-466d-b709-acf50a895c95",
//         "publisher": "Les Inthouchables",
//         "synopsis": "x",
//         "pictureURL": "https://adosbibliorepentigny.ca/blog/wp-content/uploads/2015/02/cle-braha.jpg"
//     }
// ]

export default function BooksList() {

    const [books, setBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [authorOptions, setAuthorOptions] = useState(null);

    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true

            getAllBooks()
            getAuthorOptions()
        }

    }, []);

    function getAuthorOptions() {
        (async () => {
            const response = await fetch(`http://localhost:8080/api/v1/authors`, {
                method: "GET"
            });
            const authors = await response.json()
            setAuthorOptions(authors)
        })();
    }

    if (isLoading) {
        return <div><h1>Loading...</h1></div>
    }

    //getAllBooks
    function getAllBooks() {
        (async () => {
            const response = await fetch("http://localhost:8080/api/v1/books", {
                method: "GET"
            });

            const books = await response.json()
            setBooks(books)
            setIsLoading(false)
        })();
    }

    function addBook(isbn, title, collection, edition, publisher, synopsis, pictureURL, authorId) {
        console.log("BooksList addBook")

        var bookRequestDTO = {
            isbn: isbn,
            title: title,
            collection: collection,
            edition: edition,
            publisher: publisher,
            synopsis: synopsis,
            pictureURL: pictureURL,
            authorId: authorId,
        }

        fetch(`http://localhost:8080/api/v1/books`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRequestDTO)
        })
            .then(async response => {
                const isJson = response
                    .headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("Data is: " + data.title)

                if (response.status == 201) {
                    getAllBooks()
                    successToast("Book added successfully")
                }

                //check for error
                if (!response.ok) {
                    const error = (data && data.message) ||
                        response.status;
                    console.log("POST error occured")
                    errorToast("Could not add the book")
                    return Promise.reject(error);
                }

                getAllBooks()
            })
    }

    function updateBook(updateBook) {
        console.log(updateBook)

        var bookRequestDTO = {
            isbn: updateBook.isbn,
            title: updateBook.title,
            collection: updateBook.collection,
            edition: updateBook.edition,
            publisher: updateBook.publisher,
            synopsis: updateBook.synopsis,
            pictureURL: updateBook.pictureURL,
            authorId: updateBook.author.authorId,
        }

        fetch(`http://localhost:8080/api/v1/books/${updateBook.isbn}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRequestDTO)
        })
            .then(async response => {
                const isJson = response
                    .headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("Data is: " + data.title)

                if (response.status == 200) {
                    getAllBooks()
                    successToast("Update successful")
                }

                //check for error
                if (!response.ok) {
                    const error = (data && data.message) ||
                        response.status;
                    console.log("PUT error occured")
                    errorToast("Could not update the book")
                    return Promise.reject(error);
                }
            })
    }

    async function deleteBookHandler(isbn) {

        const response = await fetch(`http://localhost:8080/api/v1/books/${isbn}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');

                if (response.status == 204) {
                    getAllBooks()
                    successToast("Book deleted successfully")
                }
            })
            .catch(function (error) {
                console.log("DELETE error occured")
                errorToast("Could not delete this book")
                return Promise.reject(error)
            })
    }

    return (
        <Container fluid>
            <AddBook addBook={addBook} authorOptions={authorOptions} />
            <Row sm={2} lg={4} className='justify-content-evenly'>
                {books && books.map((book) =>
                    <BookCard
                        key={book.isbn}
                        book={book}
                        updateBook={updateBook}
                        authorOptions={authorOptions}
                        onDeleteBookHandler={deleteBookHandler} />
                )}
            </Row>
        </Container>
    )
}