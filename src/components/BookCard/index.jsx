import React from "react";
import HarryPotter1 from "../../assets/harry_potter.jpg";
import ButtonView from "../ButtonView/index";
import Data from "../../HEP-BOOK.postman_collection.json";
import { useState, useEffect } from "react";
import "./style.css";

const BookCard = ({ title, year, description, coverImage }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <img src={coverImage} alt={title}></img>
      <span>Year :{year}</span>
      <span>{description}</span>
      <div className="divButton">
        <ButtonView></ButtonView>
        <ButtonView></ButtonView>
      </div>
    </div>
  );
};

export default BookCard;
