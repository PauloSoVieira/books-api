import React, { useEffect } from "react";
import "./style.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "http://5.22.217.225:8081/api/v1/auth/login";
function Index() {
  const [action, setAction] = useState("Sign up");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  /*
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      const data = await result.json();
      console.log(data);
    };
    fetchData();
  }, []);
 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      let url = LOGIN_URL;
      let body = { email, password };

      if (action === "Sign up") {
        url = "http://5.22.217.225:8081/api/v1/auth/register";
        body = { name, email, password };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);

      if (data.status && data.data && data.data.token) {
        localStorage.setItem("token", data.data.token);
        setMessage(
          action === "Sign up" ? "Sign up successful!" : "Login successful!"
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.message || "Failed");
      }
    } catch (error) {
      console.log(error);
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
              <FaUser></FaUser>
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
            type="text"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input">
          <span className="icons">
            <FaLock></FaLock>
          </span>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="message">{message}</div>
      </div>
      <div className="forgot-password">
        Lost Password?<span>Click Here!</span>
      </div>
      <div className="submit-container">
        <button type="submit" className="submit active">
          {action}
        </button>
        <button
          type="button"
          className="submit"
          onClick={() => setAction(action === "Login" ? "Sign up" : "Login")}
        >
          {action === "Login" ? "Sign up" : "Login"}
        </button>
      </div>
    </form>
  );
}

export default Index;
