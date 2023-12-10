package com.nneji.library.presentationlayer.authors;

import com.nneji.library.businesslayer.authors.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/authors")
public class AuthorController {

    private AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public ResponseEntity<List<AuthorResponseDTO>> getAuthors() {
        return ResponseEntity.status(HttpStatus.OK).body(authorService.getAllAuthors());
    }

    @GetMapping("/{authorId}")
    public ResponseEntity<AuthorResponseDTO> getAuthorById(@PathVariable String authorId) {
        return ResponseEntity.status(HttpStatus.OK).body(authorService.getAuthor(authorId));
    }

    @PostMapping
    public ResponseEntity<AuthorResponseDTO> addAuthor(@RequestBody AuthorRequestDTO authorRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authorService.addAuthor(authorRequestDTO));
    }

    @PutMapping("/{authorId}")
    public ResponseEntity<AuthorResponseDTO> updateAuthor(@RequestBody AuthorRequestDTO authorRequestDTO,
                                                      @PathVariable String authorId) {
        AuthorResponseDTO updatedAuthor = authorService.updateAuthor(authorRequestDTO, authorId);
        return ResponseEntity.status(HttpStatus.OK).body(updatedAuthor);
    }

    @DeleteMapping("/{authorId}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable String authorId) {
        authorService.deleteAuthor(authorId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
