import React from "react";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <ul>
          <h2>Follow us</h2>
          <li>
            <a id="facebook" href="https://www.facebook.com" target="_blank">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a id="instagram" href="https://www.instagram.com" target="_blank">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a id="pinterest" href="https://www.pinterest.com" target="_blank">
              <FaPinterest />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
