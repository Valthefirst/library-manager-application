package com.nneji.library.dataaccesslayer.authors;

import com.nneji.library.dataaccesslayer.books.Book;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "authors")
@Data
@NoArgsConstructor
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "authorid")
    private String authorId;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name = "emailaddress")
    private String emailAddress;
    private String description;
    @Column(name = "pictureurl")
    private String pictureURL;

    @OneToMany(mappedBy = "author")
    private Set<Book> books;
}
