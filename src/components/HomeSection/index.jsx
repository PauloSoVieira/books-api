import React from "react";
import libraryImage from "../../assets/library.jpg";
import "./style.css";

const HomeSection = () => {
  return (
    <div className="HomeSection">
      <img src={libraryImage} alt="library-Background"></img>
    </div>
  );
};

export default HomeSection;
