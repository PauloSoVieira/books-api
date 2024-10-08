import React from "react";
import "./style.css";
import { useModal } from "../ModalContext";
import { FaBookOpen } from "react-icons/fa";

const index = ({ book }) => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(book);
  };
  return (
    <button onClick={handleClick} className="buttonView">
      <FaBookOpen />
    </button>
  );
};

export default index;
