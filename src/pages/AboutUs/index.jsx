import React from "react";
import "./style.css";

const index = () => {
  return (
    <div className="about-us">
      <div className="text-about">
        <h1>Welcome to Books API</h1>
        <p>
          Where Stories Come to Life , we believe that every book is a gateway
          to a new world. Founded in 2024 by a group of avid readers, our
          mission is simple: to connect people with stories that will inspire,
          challenge, and transform them.
        </p>
        <p>
          Our Journey: We started as a small corner shop, with shelves filled
          with beloved books and a cup of coffee always at hand. Today, we've
          evolved into a dynamic online platform, but we maintain the same
          welcoming spirit and passion for literature that defined us from the
          beginning.
        </p>
        <p>
          What Makes Us Unique: - Careful Curation: Every book in our catalog is
          hand-picked, ensuring a diverse and quality selection. - Vibrant
          Community: More than just a bookstore, we're a meeting point for book
          lovers.
        </p>
        <p className="invite"> Shall we explore together?</p>
      </div>
    </div>
  );
};

export default index;
