import React from "react";
import { useModal } from "../ModalContext";
import "./style.css";

const index = () => {
  const { isModalOpen, selectedBook, closeModal } = useModal();

  if (!isModalOpen) {
    return null;
  }

  console.log(selectedBook);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      {selectedBook && (
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
          <div className="image-div">
            <img src={selectedBook.book_cover} alt={selectedBook.title} />
          </div>
          <div className="text">
            <h3>{selectedBook.title}</h3>
            <p>
              <strong>Year:</strong> {selectedBook.year}
            </p>
            <p>
              <strong>Description:</strong> {selectedBook.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
