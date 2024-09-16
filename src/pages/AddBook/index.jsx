import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const navigate = useNavigate();

  const handleTitle = (event) => setTitle(event.target.value);
  const handleYear = (event) => setYear(event.target.value);
  const handleDescription = (event) => setDescription(event.target.value);
  const handleImageCover = (event) => setCoverImage(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookData = {
      title,
      description,
      year: parseInt(year),
      book_cover: coverImage,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No authentication token found. Please log in.");
      navigate("/login");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(bookData),
      redirect: "follow",
    };

    try {
      const response = await fetch("/api/book/", requestOptions);
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Book added successfully!");
        navigate("/books");
      } else {
        alert(`Failed to add book: ${result}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Add Book</h1>
        <div className="title">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            placeholder="Title"
          />
        </div>
        <div className="year">
          <label>Year</label>
          <input
            type="number"
            value={year}
            onChange={handleYear}
            placeholder="Year"
          />
        </div>
        <div className="description">
          <label>Description </label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescription}
            placeholder="short description of book"
          ></textarea>
        </div>
        <div className="coverImage">
          <label>Url of image</label>
          <input
            type="url"
            onChange={handleImageCover}
            value={coverImage}
            placeholder="http://image.."
          />
        </div>
        <button type="submit">Save Book</button>
      </form>
    </div>
  );
};

export default AddBook;
