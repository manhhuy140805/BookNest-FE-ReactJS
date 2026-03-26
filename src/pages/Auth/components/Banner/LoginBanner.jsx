import React from "react";
import { BookOutlined, StarFilled, CommentOutlined } from "@ant-design/icons";
import styles from "./LoginBanner.module.css";

const LoginBanner = () => {
  return (
    <div className={`hidden-mobile ${styles.container}`}>
      {/* Background Image with Overlay */}
      <div className={styles.backgroundImage} />
      <div className={styles.overlay} />

      {/* Floating shapes with blur */}
      <div
        className={styles.floatingShape1}
        style={{ top: "10%", left: "10%" }}
      />
      <div
        className={styles.floatingShape2}
        style={{ bottom: "15%", right: "8%" }}
      />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.logoSection}>
          <img
            src="/images/logo/logo-text-white.png"
            alt="BookNest"
            className={styles.logo}
          />
        </div>

        <h2 className={styles.heading}>
          Find Your Next Favorite Book
          <br />
          Is Just A <span className={styles.highlight}>Click Away</span>
        </h2>

        <p className={styles.description}>
          Join BookNest and explore thousands of books, track your reading
          goals, and connect with readers who share your passion for stories.
        </p>

        <div className={styles.features}>
          <div className={styles.feature} style={{ "--feature-index": "0" }}>
            <BookOutlined className={styles.featureIcon} />
            <span className={styles.featureText}>Thousands of Books</span>
          </div>
          <div className={styles.feature} style={{ "--feature-index": "1" }}>
            <StarFilled className={styles.featureIcon} />
            <span className={styles.featureText}>Curated Collections</span>
          </div>
          <div className={styles.feature} style={{ "--feature-index": "2" }}>
            <CommentOutlined className={styles.featureIcon} />
            <span className={styles.featureText}>Reader Community</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;
