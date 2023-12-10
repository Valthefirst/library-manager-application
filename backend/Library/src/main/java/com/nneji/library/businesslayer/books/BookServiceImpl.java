package com.nneji.library.businesslayer.books;

import com.nneji.library.dataaccesslayer.authors.Author;
import com.nneji.library.dataaccesslayer.authors.AuthorRepository;
import com.nneji.library.dataaccesslayer.books.Book;
import com.nneji.library.dataaccesslayer.books.BookRepository;
import com.nneji.library.presentationlayer.authors.AuthorResponseDTO;
import com.nneji.library.presentationlayer.books.BookRequestDTO;
import com.nneji.library.presentationlayer.books.BookResponseDTO;
import com.nneji.library.utils.execptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService{

    private BookRepository bookRepository;
    private AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<BookResponseDTO> getAllBooks() {
        List<Book> bookEntities = bookRepository.findAll();

        // need to convert list of books to response DTOs to hide database id
            // create a new empty list
        List<BookResponseDTO> bookResponseDTOList = new ArrayList<>();
            // copy each book to new DTO list
        for (Book book : bookEntities) {
            BookResponseDTO bookResponseDTO = new BookResponseDTO();
            BeanUtils.copyProperties(book, bookResponseDTO);

            AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
            BeanUtils.copyProperties(book.getAuthor(), authorResponseDTO);
            bookResponseDTO.setAuthor(authorResponseDTO);

            bookResponseDTOList.add(bookResponseDTO);
        }
        return bookResponseDTOList;
    }

    @Override
    public BookResponseDTO getBook(String isbn) {
        Book foundBook = bookRepository.findBookByIsbn(isbn);

        if (foundBook == null) {
            throw new NotFoundException("Unknown ISBN provided: " + isbn);
        }

        //convert foundBook (entity) to BookResponseDTO
        BookResponseDTO bookResponseDTO = new BookResponseDTO();
        BeanUtils.copyProperties(foundBook, bookResponseDTO);

        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(foundBook.getAuthor(), authorResponseDTO);
        bookResponseDTO.setAuthor(authorResponseDTO);

        return bookResponseDTO;
    }

    @Override
    public BookResponseDTO addBook(BookRequestDTO bookRequestDTO) {
        // find author by provided authorId
        Author foundAuthor = authorRepository.findAuthorByAuthorId(bookRequestDTO.getAuthorId());

        if (foundAuthor == null) {
            throw new NotFoundException("Unknown authorId provided: " + bookRequestDTO.getAuthorId());
        }

        //convert bookRequestDTO to an Entity
        Book book = new Book();
        BeanUtils.copyProperties(bookRequestDTO, book);
        book.setIsbn(bookRequestDTO.getIsbn());

        //add the author
        book.setAuthor(foundAuthor);

        // save new Book to DB via repository
        Book savedBook = bookRepository.save(book);

        //convert savedBook (entity) to BookResponseDTO
        BookResponseDTO bookResponseDTO = new BookResponseDTO();
        BeanUtils.copyProperties(savedBook, bookResponseDTO);

        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(savedBook.getAuthor(), authorResponseDTO);
        bookResponseDTO.setAuthor(authorResponseDTO);

        return bookResponseDTO;
    }

    @Override
    public BookResponseDTO updateBook(BookRequestDTO bookRequestDTO, String isbn) {
        Book foundBook = bookRepository.findBookByIsbn(isbn);

        if (foundBook == null) {
            throw new NotFoundException("Unknown ISBN provided: " + isbn);
        }

        // find author by provided authorId
        Author foundAuthor = authorRepository.findAuthorByAuthorId(bookRequestDTO.getAuthorId());

        if (foundAuthor == null) {
            throw new NotFoundException("Unknown authorId provided: " + bookRequestDTO.getAuthorId());
        }

        //convert bookRequestDTO to an entity
        Book book = new Book();
        BeanUtils.copyProperties(bookRequestDTO, book);
        book.setIsbn(foundBook.getIsbn());
        book.setId(foundBook.getId());

        //add the author
        book.setAuthor(foundAuthor);

        // save movie entity to movie repository
        Book savedBook = bookRepository.save(book);

        //convert savedBook (entity) to BookResponseDTO
        BookResponseDTO bookResponseDTO = new BookResponseDTO();
        BeanUtils.copyProperties(savedBook, bookResponseDTO);

        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(savedBook.getAuthor(), authorResponseDTO);
        bookResponseDTO.setAuthor(authorResponseDTO);

        return bookResponseDTO;
    }

    @Override
    public void deleteBook(String isbn) {
        Book foundBook = bookRepository.findBookByIsbn(isbn);

        if (foundBook == null) {
            throw new NotFoundException("Unknown ISBN provided: " + isbn);
        }

        bookRepository.delete(foundBook);
    }
}
