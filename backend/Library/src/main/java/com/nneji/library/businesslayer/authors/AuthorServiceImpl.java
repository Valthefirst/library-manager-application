package com.nneji.library.businesslayer.authors;

import com.nneji.library.dataaccesslayer.authors.Author;
import com.nneji.library.dataaccesslayer.authors.AuthorRepository;
import com.nneji.library.presentationlayer.authors.AuthorRequestDTO;
import com.nneji.library.presentationlayer.authors.AuthorResponseDTO;
import com.nneji.library.utils.execptions.InUseException;
import com.nneji.library.utils.execptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AuthorServiceImpl implements AuthorService{

    private AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<AuthorResponseDTO> getAllAuthors() {
        List<Author> authorEntities = authorRepository.findAll();

        // need to convert list of authors to response DTOs to hide database id
            // create a new empty list
        List<AuthorResponseDTO> authorResponseDTOList = new ArrayList<>();
            // copy each author to new DTO list
        for (Author author : authorEntities) {
            AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
            BeanUtils.copyProperties(author, authorResponseDTO);
            authorResponseDTOList.add(authorResponseDTO);
        }
        return authorResponseDTOList;
    }

    @Override
    public AuthorResponseDTO getAuthor(String authorId) {
        Author foundAuthor = authorRepository.findAuthorByAuthorId(authorId);

        if (foundAuthor == null) {
            throw new NotFoundException("Unknown authorId provided: " + authorId);
        }

        //convert foundAuthor (entity) to AuthorResponseDTO
        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(foundAuthor, authorResponseDTO);

        return authorResponseDTO;
    }

    @Override
    public AuthorResponseDTO addAuthor(AuthorRequestDTO authorRequestDTO) {
        Author author = new Author();
        BeanUtils.copyProperties(authorRequestDTO, author);
        author.setAuthorId(UUID.randomUUID().toString());

        // save new Author to DB via repository
        Author savedAuthor = authorRepository.save(author);

        // convert savedAuthor (entity) to AuthorResponseDTO
        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(savedAuthor, authorResponseDTO);

        return authorResponseDTO;
    }

    @Override
    public AuthorResponseDTO updateAuthor(AuthorRequestDTO authorRequestDTO, String authorId) {
        Author foundAuthor = authorRepository.findAuthorByAuthorId(authorId);

        if (foundAuthor == null) {
            throw new NotFoundException("Unknown authorId provided: " + authorId);
        }

        // convert authorRequestDTO to an entity
        Author author = new Author();
        BeanUtils.copyProperties(authorRequestDTO, author);
        author.setAuthorId(foundAuthor.getAuthorId());
        author.setId(foundAuthor.getId());

        // save author entity to author repository
        Author savedAuthor = authorRepository.save(author);

        // convert savedAuthor (entity) to AuthorResponseDTO
        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(savedAuthor, authorResponseDTO);
        return authorResponseDTO;
    }

    @Override
    public void deleteAuthor(String authorId) {
        Author foundAuthor = authorRepository.findAuthorByAuthorId(authorId);

        if (foundAuthor == null) {
            throw new NotFoundException("Unknown authorId provided: " + authorId);
        }

        try {
            authorRepository.delete(foundAuthor);
        }
        catch (DataIntegrityViolationException ex) {
            throw new InUseException("Cannot delete author with authorId: " + authorId +
                    " as it still has books associated to it");
        }

        authorRepository.delete(foundAuthor);
    }
}
