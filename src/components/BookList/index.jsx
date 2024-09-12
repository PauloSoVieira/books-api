import React from "react";
import BookCard from "../BookCard";
import "./style.css";

const BookList = () => {
  return (
    <div className="booklist">
      <BookCard></BookCard>
      <BookCard></BookCard>
      <BookCard></BookCard>
      <BookCard></BookCard>
      <BookCard></BookCard>
    </div>
  );
};

export default BookList;
