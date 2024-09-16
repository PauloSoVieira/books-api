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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navBar">
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ol className={isMenuOpen ? "open" : ""}>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/books" onClick={() => setIsMenuOpen(false)}>
            Books
          </Link>
        </li>
        <li>
          <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>
            About us
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                {userName}'s profile
              </Link>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <li>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Header;
