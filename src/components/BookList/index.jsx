import React, { useEffect, useState, useMemo } from "react";
import BookCard from "../BookCard";
import { useNavigate } from "react-router-dom";
import "./style.css";

const BookList = () => {
  const [searchBook, setSearchBook] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const result = await fetch("/api/book/");
      const data = await result.json();
      if (data.status && data.data) {
        setBooks(data.data);
        console.log("Fetched books:", data.data);
      }
    } catch (error) {
      console.error("error fetch", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    navigate("/add-book");
  };

  const handleDeleteBook = async (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleSearchBook = (event) => {
    setSearchBook(event.target.value);
  };

  //useMemo to filter books based on search input
  //returns memoized array of books
  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
        book.id.toString().includes(searchBook)
    );
  }, [books, searchBook]);

  console.log("Filtered books:", filteredBooks);

  return (
    <>
      <nav className="search-nav">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by book name or ID..."
            value={searchBook}
            onChange={handleSearchBook}
            className="search-input"
          />
        </div>
      </nav>
      <div className="book-list-container">
        <div className="book-list-header">
          <h1>Book List</h1>
          <button className="add-book-btn" onClick={handleAddBook}>
            Add Book
          </button>
        </div>
        <div className="booklist">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              year={book.year}
              description={book.description}
              coverImage={book.book_cover}
              book={book}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;
