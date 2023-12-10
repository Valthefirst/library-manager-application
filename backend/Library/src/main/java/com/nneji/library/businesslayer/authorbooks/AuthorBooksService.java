package com.nneji.library.businesslayer.authorbooks;

import com.nneji.library.presentationlayer.authorbooks.AuthorBooksResponseDTO;

import java.util.List;

public interface AuthorBooksService {

    AuthorBooksResponseDTO getAllBooksByAuthorId(String authorId);
}
