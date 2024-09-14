import React from "react";
import "./style.css";
import { useModal } from "../ModalContext";

const index = ({ book }) => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(book);
  };
  return (
    <button onClick={handleClick} className="buttonView">
      View
    </button>
  );
};

export default index;
