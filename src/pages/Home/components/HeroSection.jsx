import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import "./HeroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-text">Editor Choice Best Books</span>
            <span className="hero-badge-discount">Up To 50% Off</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-heading">
            Your Next Favorite Book
            <br />
            Is Just A <span className="hero-highlight">Click Away</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            Sed ac arcu sed felis vulputate molestie. Nullam at urna in velit
            finibus vestibulum euismod A Urna. Sed quia aliquam leo. Duis
            iaculis lorem mauris, et convallis du
          </p>

          {/* Buttons */}
          <div className="hero-buttons">
            <Button
              text="Shop Now"
              variant="primary"
              icon={<ArrowRightOutlined />}
            />
            <Button
              text="View All Books"
              variant="secondary"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate("/books")}
            />
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image-section">
          <img
            src="/images/hero-girl-1.png"
            alt="Reading Girl"
            className="hero-image"
          />
          <img
            src="/images/book-2.png"
            alt="Book"
            className="hero-floating-book"
          />
          <img
            src="/images/book-shape.png"
            alt="Book"
            className="hero-floating-book-bottom"
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hero-decorative-shape"></div>
    </section>
  );
}
