import React, { useEffect, useState } from "react";
import BookCard from "../BookCard";
import { useNavigate } from "react-router-dom";
import "./style.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const url = "http://5.22.217.225:8081/api/v1/book/";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await fetch(url);
        const data = await result.json();
        if (data.status && data.data) {
          setBooks(data.data);
          console.log(data);
        }
        // console.log(data);
      } catch (error) {
        console.error("error fetch", error);
      }
    };
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    navigate("/add-book");
  };

  return (
    <>
      <div className="book-list-container">
        <div className="book-list-header">
          <h1>Book List</h1>
          <button className="add-book-btn" onClick={handleAddBook}>
            Add Book
          </button>
        </div>
        <div className="booklist">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              year={book.year}
              description={book.description}
              coverImage={book.book_cover}
              book={book}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;
