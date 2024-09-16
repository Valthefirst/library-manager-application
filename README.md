# Library Manager Application

## Project Description

This library management application is designed to help you keep track of your personal collection. It allows you to add, update, and delete books and authors efficiently. The application consists of a Java backend based on REST architecture, implemented using the JPA framework and Hibernate ORM. For the frontend, the application is built with ReactJS and React-Bootstrap. Other libraries used include [React Router](https://reactrouter.com/en/main) and [React-toastify](https://fkhadra.github.io/react-toastify/introduction). I specifically chose React Router because of its ability to enable multi-page navigation in a React application. In the future, I plan to implement a search feature.

---

## How to run the project
Download the project and open the backend folder in an IDE of your choice and run it. Then go in the fontend folder (library-fe) in the termianl and run ``npm install`` then ``npm start``

---

## Relationship Diagram

![Class Diagram](https://github.com/user-attachments/assets/a1eec4f3-1744-403b-8e8a-06d728ad6005)

---

## Endpoints

For Authors
- /api/v1/authors : GET ALL
- /api/v1/authors/{authorId} : GET
- /api/v1/authors : POST
- /api/v1/authors/{authorId} : PUT
- /api/v1/authors/{authorId} : DELETE

For Books
- /api/v1/books : GET ALL
- /api/v1/books/{bookId} : GET
- /api/v1/books : POST
- /api/v1/books/{bookId} : PUT
- /api/v1/books/{bookId} : DELETE 

Aggregate
- /api/v1/{authorId}/books : GET ALL

---

## Screenshots

![image](https://github.com/user-attachments/assets/6af6c0bb-f8c4-4ddd-9851-23624fe34f40)
![image](https://github.com/user-attachments/assets/2eb5e335-f312-4c77-af94-07bcbbd2dbdf)
![image](https://github.com/user-attachments/assets/c7647ec8-b509-419c-ae34-0c22e334dc23)
![image](https://github.com/user-attachments/assets/c34a873c-7043-4848-820d-dd7c856c17cf)
![image](https://github.com/user-attachments/assets/9fe23bd1-5d26-417f-a86a-849609ed973b)

![image](https://github.com/user-attachments/assets/9dcf42e8-9af8-4051-bc28-97975d516b78)

![image](https://github.com/user-attachments/assets/6b6410b6-6ab2-4fb9-884d-aaf1d9c50fdc)
![image](https://github.com/user-attachments/assets/bd2add14-0976-4579-84f1-74555d8def04)
![image](https://github.com/user-attachments/assets/aef8c5ee-c8fd-41c5-bbee-6021e33e7e7f)
![image](https://github.com/user-attachments/assets/2664f098-8d61-4292-ba13-29ac4a8159a7)
![image](https://github.com/user-attachments/assets/0dfe7d9b-c571-48c3-8817-08bc57471cec)

