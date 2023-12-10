package com.nneji.library.presentationlayer.authors;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthorRequestDTO {

    private String firstName;
    private String lastName;
    private String emailAddress;
    private String description;
    private String pictureURL;
}
