import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeText}>Editor Choice Best Books</span>
            <span className={styles.heroBadgeDiscount}>Up To 50% Off</span>
          </div>

          {/* Main Heading */}
          <h1 className={styles.heroHeading}>
            Your Next Favorite Book
            <br />
            Is Just A <span className={styles.heroHighlight}>Click Away</span>
          </h1>

          {/* Description */}
          <p className={styles.heroDescription}>
            Sed ac arcu sed felis vulputate molestie. Nullam at urna in velit
            finibus vestibulum euismod A Urna. Sed quia aliquam leo. Duis
            iaculis lorem mauris, et convallis du
          </p>

          {/* Buttons */}
          <div className={styles.heroButtons}>
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
        <div className={styles.heroImageSection}>
          <img
            src="/images/hero-girl-1.png"
            alt="Reading Girl"
            className={styles.heroImage}
          />
          <img
            src="/images/book-2.png"
            alt="Book"
            className={styles.heroFloatingBook}
          />
          <img
            src="/images/book-shape.png"
            alt="Book"
            className={styles.heroFloatingBookBottom}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.heroDecorativeShape}></div>
    </section>
  );
}
