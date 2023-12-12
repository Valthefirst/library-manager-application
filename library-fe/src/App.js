import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavBar from './components/MyNavBar';
import HomePage from './components/pages/HomePage';
import AuthorsPage from './components/pages/AuthorsPage';
import BooksPage from './components/pages/BooksPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthorBooksList from "./components/AuthorBooksList";
import BookAuthorList from "./components/BookAuthorList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  
import React from 'react';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <MyNavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/authorbooks" element={<AuthorBooksList />} />
          <Route path="/bookauthor" element={<BookAuthorList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
