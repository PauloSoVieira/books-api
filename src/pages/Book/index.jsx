import React from "react";
import BookList from "../../components/BookList";
import "./style.css";
import { ModalProvider } from "../../components/ModalContext";
import Modal from "../../components/Modal";

const Book = () => {
  return (
    <div className="booklist">
      <ModalProvider>
        <BookList />
        <Modal></Modal>
      </ModalProvider>
    </div>
  );
};

export default Book;
