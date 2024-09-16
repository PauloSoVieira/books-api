import React from "react";
import ButtonView from "../ButtonView/index";
import "./style.css";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const BookCard = ({ title, year, coverImage, onDelete, book }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-book/${book.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(`/api/book/${book.id}`, requestOptions);

        if (response.status === 403) {
          throw new Error("You don't have permission to delete this book");
        }

        if (!response.ok) {
          throw new Error("Failed to delete the book");
        }

        const result = await response.text();
        console.log(result);

        if (onDelete) {
          onDelete(book.id);
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert(error.message || "Failed to delete the book. Please try again.");
      }
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
              <MdModeEdit />
            </button>
            <button onClick={handleDelete} className="buttonDelete">
              <MdDelete />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BookCard;
