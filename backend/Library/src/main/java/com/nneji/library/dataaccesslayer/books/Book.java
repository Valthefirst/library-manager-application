package com.nneji.library.dataaccesslayer.books;

import com.nneji.library.dataaccesslayer.authors.Author;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String isbn;
    private String title;
    private String collection;
    private String edition;
    private String publisher;
    private String synopsis;
    @Column(name = "pictureurl")
    private String pictureURL;

    @ManyToOne
    @JoinColumn(name = "authorid", referencedColumnName = "authorid")
    private Author author;
}
