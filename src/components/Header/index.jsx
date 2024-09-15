import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/Login";
import "./style.css";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

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
        {user ? (
          <>
            <li>
              <Link to="/profile">{userName}'s profile</Link>
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
