package com.nneji.library.businesslayer.authors;

import com.nneji.library.presentationlayer.authors.AuthorRequestDTO;
import com.nneji.library.presentationlayer.authors.AuthorResponseDTO;
import com.nneji.library.presentationlayer.books.BookRequestDTO;
import com.nneji.library.presentationlayer.books.BookResponseDTO;

import java.util.List;

public interface AuthorService {

    List<AuthorResponseDTO> getAllAuthors();
    AuthorResponseDTO getAuthor(String authorId);
    AuthorResponseDTO addAuthor(AuthorRequestDTO authorRequestDTO);
    AuthorResponseDTO updateAuthor(AuthorRequestDTO authorRequestDTO, String authorId);
    void deleteAuthor(String authorId);
}
