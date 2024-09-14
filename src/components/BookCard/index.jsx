import React from "react";
import ButtonView from "../ButtonView/index";
import { useState, useEffect } from "react";
import "./style.css";

const BookCard = ({ title, year, description, coverImage, book }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <img src={coverImage} alt={title}></img>
      <span>Year :{year}</span>
      <span>{description}</span>
      <div className="divButton">
        <ButtonView book={book}></ButtonView>
        <ButtonView book={book}></ButtonView>
      </div>
    </div>
  );
};

export default BookCard;
