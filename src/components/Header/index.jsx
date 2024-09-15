import React from "react";
import { Link } from "react-router-dom";
import "../../pages/Login";
import "./style.css";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../pages/EditProfile";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navBar">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>About us</li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile"> Edit Profile</Link>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Header;
