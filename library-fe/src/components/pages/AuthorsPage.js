import AuthorsList from '../AuthorsList';
import './HomePage.css';

export default function AuthorsPage() {
    return (
        <div className="center">
            <h1>Authors of your books</h1>
            <AuthorsList />
        </div>
    )
}