import AddAuthor from '../AddAuthor';
import AddBook from '../AddBook';
import './HomePage.css';

export default function HomePage({ addAuthor }) {

    return (
        <div>
            <h1>Welcome to your Library!</h1>
            <h3>You must add an author first before adding a book to your library.</h3>
        </div>
    )
}
