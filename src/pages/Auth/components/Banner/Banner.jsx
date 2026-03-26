import React from "react";
import styles from "./Banner.module.css";

const Banner = ({
  logo,
  icon,
  title,
  heading,
  highlight,
  description,
  features,
}) => {
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
        {/* Logo or Icon */}
        {logo && (
          <div className={styles.logoSection}>
            <img src={logo} alt="BookNest" className={styles.logo} />
          </div>
        )}
        {icon && <div className={styles.icon}>{icon}</div>}

        {/* Title/Heading */}
        {heading ? (
          <h2 className={styles.heading}>
            {heading}
            <br />
            {highlight && (
              <>
                Is Just A <span className={styles.highlight}>{highlight}</span>
              </>
            )}
          </h2>
        ) : (
          title && <h1 className={styles.title}>{title}</h1>
        )}

        {/* Description */}
        {description && <p className={styles.description}>{description}</p>}

        {/* Features */}
        {features && features.length > 0 && (
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={styles.feature}
                style={{ "--feature-index": index }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <span className={styles.featureText}>{feature.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
