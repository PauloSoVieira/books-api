import React from "react";
import "./style.css";
import "./style.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../../components/AuthContext/AuthContext";

const index = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <form className="container">
      <div className="header">
        <div className="text">Edit profile</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <span className="icons">
            <FaUser />
          </span>
          <input type="text" placeholder="Name" />
        </div>

        <div className="input">
          <span className="icons">
            <MdEmail />
          </span>
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <span className="icons">
            <FaLock />
          </span>
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="forgot-password"></div>
      <div className="submit-container">
        <button type="submit" className="submit active">
          Save changes
        </button>
      </div>
    </form>
  );
};

export default index;
