import React, { useState } from "react";
import "./style.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";

function Index() {
  const { login } = useAuth();
  const [action, setAction] = useState("Sign up");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const urlRegister = "/api/auth/register";
      const urlLogin = "/api/auth/login";
      const url = action === "Sign up" ? urlRegister : urlLogin;
      const body =
        action === "Sign up" ? { name, email, password } : { email, password };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      if (data.status) {
        if (action === "Sign up") {
          setMessage("Sign up successful! Please log in.");
          setAction("Login");
          setName("");
          setPassword("");
        } else {
          if (data.data && data.data.token) {
            localStorage.setItem("token", data.data.token);
            login(data.data);
            setMessage("Login successful!");
            navigate("/");
          } else {
            setMessage("Login failed. Please check your credentials.");
          }
        }
      } else {
        setMessage(data.errors);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign up" && (
          <div className="input">
            <span className="icons">
              <FaUser />
            </span>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        )}
        <div className="input">
          <span className="icons">
            <MdEmail />
          </span>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input">
          <span className="icons">
            <FaLock />
          </span>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {message && <div className="message">{message}</div>}
      </div>
      <div className="forgot-password">
        Lost Password? <span>Click Here!</span>
      </div>
      <div className="submit-container">
        <button type="submit" className="submit active">
          {action}
        </button>
        <button
          type="button"
          className="submit"
          onClick={() => {
            setAction(action === "Login" ? "Sign up" : "Login");
            setMessage("");
          }}
        >
          {action === "Login" ? "Sign up" : "Login"}
        </button>
      </div>
    </form>
  );
}

export default Index;
