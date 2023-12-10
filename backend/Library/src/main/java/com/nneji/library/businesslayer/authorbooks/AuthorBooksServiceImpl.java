package com.nneji.library.businesslayer.authorbooks;

import com.nneji.library.dataaccesslayer.authors.Author;
import com.nneji.library.dataaccesslayer.authors.AuthorRepository;
import com.nneji.library.dataaccesslayer.books.Book;
import com.nneji.library.dataaccesslayer.books.BookRepository;
import com.nneji.library.presentationlayer.authorbooks.AuthorBooksResponseDTO;
import com.nneji.library.presentationlayer.authors.AuthorResponseDTO;
import com.nneji.library.presentationlayer.books.BookResponseDTO;
import com.nneji.library.utils.execptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorBooksServiceImpl implements AuthorBooksService{

    private AuthorRepository authorRepository;
    private BookRepository bookRepository;

    public AuthorBooksServiceImpl(AuthorRepository authorRepository, BookRepository bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public AuthorBooksResponseDTO getAllBooksByAuthorId(String authorId) {
        Author foundAuthor = authorRepository.findAuthorByAuthorId(authorId);
        if (foundAuthor == null) {
            throw new NotFoundException("Unknown directorId provided: " + authorId);
        }

        AuthorBooksResponseDTO authorBooksResponseDTO = new AuthorBooksResponseDTO();
        BeanUtils.copyProperties(foundAuthor, authorBooksResponseDTO);

        List<Book> bookList = bookRepository.findBookByAuthor_AuthorId(authorId);

        List<BookResponseDTO> bookResponseDTOList = new ArrayList<>();
        for (Book book : bookList) {
            BookResponseDTO bookResponseDTO = new BookResponseDTO();
            BeanUtils.copyProperties(book, bookResponseDTO);

            AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
            BeanUtils.copyProperties(book.getAuthor(), authorResponseDTO);
            bookResponseDTO.setAuthor(authorResponseDTO);
            bookResponseDTOList.add(bookResponseDTO);
        }
        authorBooksResponseDTO.setBooks(bookResponseDTOList);

        return authorBooksResponseDTO;
    }
}
