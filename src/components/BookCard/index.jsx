import React from "react";
import ButtonView from "../ButtonView/index";
import "./style.css";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const BookCard = ({ title, year, coverImage, onEdit, onDelete, book }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-book/${book.id}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(book);
    } else {
      console.log("no onDelete");
    }
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <img src={coverImage} alt={title}></img>
      <span>Year :{year}</span>
      <div className="divButton">
        <ButtonView book={book}></ButtonView>
        {user ? (
          <>
            <button onClick={handleEdit} className="buttonEdit">
              Edit
            </button>
            <button onClick={handleDelete} className="buttonDelete">
              Delete
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BookCard;
