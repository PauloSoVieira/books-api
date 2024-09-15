import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";
import "./style.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, checkTokenValidity, logout } = useAuth();
  const [book, setBook] = useState({
    title: "",
    year: "",
    description: "",
    book_cover: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const isValid = await checkTokenValidity();
        if (!isValid) {
          setError("Token is not valid. Please log in again.");
          logout();
          navigate("/login");
          return;
        }

        const response = await fetch(`/api/book/${id}`, {
          headers: {
            Authorization: user.token,
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log("Fetched book data:", responseData);
          if (responseData.status && responseData.data) {
            setBook(responseData.data);
          } else {
            setError("Invalid data structure received from the server");
          }
        } else {
          setError("Failed to fetch book details");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("An error occurred while fetching the book");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && id) {
      fetchBook();
    }
  }, [id, user, checkTokenValidity, logout, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const isValid = await checkTokenValidity();
      if (!isValid) {
        setError("Token is not valid. Please log in again.");
        logout();
        navigate("/login");
        return;
      }

      const response = await fetch(`/api/book/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === true) {
        setSuccess("Book updated successfully!");
        setTimeout(() => navigate("/books"), 2000);
      } else {
        setError(data.message || "Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      setError(`An error occurred while updating the book: ${error.message}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-book-container">
      <div className="book-preview">
        <h2>Current Book</h2>
        <img
          src={book.book_cover || "https://via.placeholder.com/150"}
          alt={book.title}
          className="book-cover"
        />
        <h3>{book.title}</h3>
        <p>Year: {book.year}</p>
      </div>
      <div className="edit-form-section">
        <h2>Edit Book</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={book.year}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="book_cover">Cover Image URL</label>
            <input
              type="url"
              id="book_cover"
              name="book_cover"
              value={book.book_cover}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="update-book-btn">
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
