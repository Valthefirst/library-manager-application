package com.nneji.library.presentationlayer.books;

import com.nneji.library.presentationlayer.authors.AuthorResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookResponseDTO {

    private String isbn;
    private String title;
    private String collection;
    private String edition;
    private String publisher;
    private String synopsis;
    private String pictureURL;
    private AuthorResponseDTO author;
}
