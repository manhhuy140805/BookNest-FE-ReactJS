import React from "react";
import { ReadOutlined } from "@ant-design/icons";
import styles from "./RegisterBanner.module.css";

const RegisterBanner = () => {
  return (
    <div className={`hidden-mobile ${styles.container}`}>
      {/* Background Image with Overlay */}
      <div className={styles.backgroundImage} />
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <ReadOutlined className={styles.icon} />
        <h1 className={styles.title}>BookNest</h1>
        <p className={styles.description}>
          Join thousands of book lovers. Discover, review, and share your
          favorite books.
        </p>
      </div>
    </div>
  );
};

export default RegisterBanner;
