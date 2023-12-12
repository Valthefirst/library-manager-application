import AddAuthor from '../AddAuthor';
import AddBook from '../AddBook';
import './HomePage.css';

export default function HomePage({ addAuthor }) {

    return (
        <div>
            <h1>Welcome to your Library!</h1>
            <div className='author-btn'>
                <AddAuthor addAuthor={addAuthor} />
            </div>
            <div className='book-btn'>
                <AddBook />
            </div>
        </div>
    )
}