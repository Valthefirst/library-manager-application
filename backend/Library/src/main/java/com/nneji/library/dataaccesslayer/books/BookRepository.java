package com.nneji.library.dataaccesslayer.books;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {

    Book findBookByIsbn(String isbn);
    List<Book> findBookByAuthor_AuthorId(String authorId);
}
