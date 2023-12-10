package com.nneji.library.presentationlayer.books;

import com.nneji.library.businesslayer.books.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/books")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<BookResponseDTO>> getBooks() {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getAllBooks());
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<BookResponseDTO> getBookByISBN(@PathVariable String isbn) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getBook(isbn));
    }

    @PostMapping
    public ResponseEntity<BookResponseDTO> addBook(@RequestBody BookRequestDTO bookRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.addBook(bookRequestDTO));
    }

    @PutMapping("/{isbn}")
    public ResponseEntity<BookResponseDTO> updateBook(@RequestBody BookRequestDTO bookRequestDTO,
                                                       @PathVariable String isbn) {
        BookResponseDTO updatedMovie = bookService.updateBook(bookRequestDTO, isbn);
        return ResponseEntity.status(HttpStatus.OK).body(updatedMovie);
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<Void> deleteBook(@PathVariable String isbn) {
        bookService.deleteBook(isbn);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
