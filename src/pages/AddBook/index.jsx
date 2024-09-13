import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const navigate = useNavigate();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleImageCover = (event) => {
    setCoverImage(event.target.coverImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookData = {
      title,
      description,
      year,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/book/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("book : ", result);
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Add Book</h1>
        <div className="title">
          <label>Title</label>
          <input type="text" value={title} onChange={handleTitle} />
        </div>
        <div className="year">
          <label>Year</label>
          <input type="number" value={year} onChange={handleYear} />
        </div>
        <div className="description">
          <label>Description </label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescription}
          ></textarea>
        </div>
        <div className="coverImage">
          <input type="file" onChange={handleImageCover} />
        </div>
        <button type="submit">Save Book</button>
      </form>
    </div>
  );
};

export default AddBook;
