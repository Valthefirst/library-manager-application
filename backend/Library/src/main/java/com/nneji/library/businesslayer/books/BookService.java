package com.nneji.library.businesslayer.books;

import com.nneji.library.presentationlayer.books.BookRequestDTO;
import com.nneji.library.presentationlayer.books.BookResponseDTO;

import java.util.List;

public interface BookService {

    List<BookResponseDTO> getAllBooks();
    BookResponseDTO getBook(String isbn);
    BookResponseDTO addBook(BookRequestDTO bookRequestDTO);
    BookResponseDTO updateBook(BookRequestDTO bookRequestDTO, String isbn);
    void deleteBook(String isbn);
}
