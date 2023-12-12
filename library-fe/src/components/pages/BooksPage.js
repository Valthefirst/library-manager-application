import BooksList from '../BooksList';
import './HomePage.css';

export default function BooksPage() {
    return (
        <div className="center">
            <h1>Your books</h1>
                <BooksList />
        </div>
    )
}