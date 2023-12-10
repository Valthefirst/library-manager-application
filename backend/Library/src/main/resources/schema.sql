drop table authors if exists;
create table authors (
                           id INT NOT NULL AUTO_INCREMENT,
                           authorid VARCHAR(36) NOT NULL UNIQUE,
                           firstname VARCHAR(255) NOT NULL,
                           lastname VARCHAR(255) NOT NULL,
                           emailaddress VARCHAR(255),
                           description VARCHAR(500),
                           pictureurl VARCHAR(255),
                           PRIMARY KEY (id)
);

drop table books if exists;

create table books (
    id INT NOT NULL AUTO_INCREMENT,
    isbn LONG NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    collection VARCHAR(255),
    edition VARCHAR(255),
    publisher VARCHAR(255),
    synopsis VARCHAR(255),
    pictureurl VARCHAR(255),
    authorid VARCHAR(36) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (authorid) references authors(authorid)
    );