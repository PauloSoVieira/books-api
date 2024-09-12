import React from "react";
import HarryPotter1 from "../../assets/harry_potter.jpg";
import ButtonView from "../ButtonView/index";
import Data from "../../HEP-BOOK.postman_collection.json";
import { useState, useEffect } from "react";
import "./style.css";

const BookCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setData(Data);
    };
    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="card">
      <h3>Harry potter</h3>
      <img src={HarryPotter1}></img>
      <div className="divButton">
        <ButtonView></ButtonView>
        <ButtonView></ButtonView>
      </div>
    </div>
  );
};

export default BookCard;
