import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Info */}
        <div className="footer-section footer-brand">
          <h2 className="footer-logo">BookNest</h2>
          <p className="footer-contact-label">Got Questions? Call us</p>
          <p className="footer-phone">+670 413 90 762</p>
          <p className="footer-email">hanhan@gmail.com</p>
          <p className="footer-address">
            79 Sleepy Hollow St.
            <br />
            Jamaica, New York 1432
          </p>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3 className="footer-heading">Customer Support</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Store List</a>
            </li>
            <li>
              <a href="#">Opening Hours</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Return Policy</a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Novel Books</a>
            </li>
            <li>
              <a href="#">Poetry Books</a>
            </li>
            <li>
              <a href="#">Political Books</a>
            </li>
            <li>
              <a href="#">History Books</a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="footer-section footer-subscribe">
          <h3 className="footer-heading">Subscribe</h3>
          <p className="footer-sub-text">
            Our conversation is just getting started
          </p>
          <form className="footer-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer-input"
            />
            <button type="submit" className="footer-btn">
              Subscribe
            </button>
          </form>
          <p className="footer-follow">Follow Us On</p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Facebook">
              F
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              T
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              L
            </a>
            <a href="#" className="social-icon" aria-label="Vimeo">
              V
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TOWHO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
