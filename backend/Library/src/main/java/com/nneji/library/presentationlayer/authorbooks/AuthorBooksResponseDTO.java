package com.nneji.library.presentationlayer.authorbooks;

import com.nneji.library.presentationlayer.books.BookResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AuthorBooksResponseDTO {

    private String authorId;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private String description;
    private String pictureURL;
    private List<BookResponseDTO> books;
}
