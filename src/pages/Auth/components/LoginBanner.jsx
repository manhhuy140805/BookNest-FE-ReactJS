import React from "react";

const LoginBanner = () => {
  return (
    <div className="hidden-mobile" style={styles.container}>
      {/* Background Decorations */}
      <div style={styles.circle1} />
      <div style={styles.circle2} />
      <div style={styles.circle3} />

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.logoSection}>
          <img 
            src="/images/logo.png" 
            alt="Boimela" 
            style={styles.logo}
          />
        </div>

        <h2 style={styles.heading}>
          Your Next Favorite Book<br />
          Is Just A <span style={styles.highlight}>Click Away</span>
        </h2>

        <p style={styles.description}>
          Join our community of book lovers and discover your next great read. 
          Access thousands of books, connect with readers, and share your passion for literature.
        </p>

        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📚</div>
            <span style={styles.featureText}>Thousands of Books</span>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>⭐</div>
            <span style={styles.featureText}>Curated Collections</span>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>💬</div>
            <span style={styles.featureText}>Reader Community</span>
          </div>
        </div>
      </div>

      {/* Floating Book Image */}
      <img 
        src="/images/book-2.png" 
        alt="Book" 
        style={styles.floatingBook}
      />
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    background: "#ff7b54",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px",
    position: "relative",
    overflow: "hidden"
  },
  circle1: {
    position: "absolute",
    top: "-15%",
    left: "-10%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    filter: "blur(60px)"
  },
  circle2: {
    position: "absolute",
    bottom: "-20%",
    right: "-15%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.08)",
    filter: "blur(80px)"
  },
  circle3: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.06)",
    filter: "blur(40px)"
  },
  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: "500px",
    textAlign: "center"
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "40px"
  },
  logo: {
    width: "250px",
    height: "auto"
  },
  brandName: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    margin: 0
  },
  heading: {
    fontSize: "42px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: "1.3",
    marginBottom: "24px"
  },
  highlight: {
    color: "#fff",
    textShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  description: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: "1.7",
    marginBottom: "40px"
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    flexWrap: "wrap"
  },
  feature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px"
  },
  featureIcon: {
    fontSize: "32px",
    marginBottom: "4px"
  },
  featureText: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500"
  },
  floatingBook: {
    position: "absolute",
    bottom: "10%",
    right: "8%",
    width: "180px",
    height: "auto",
    animation: "float 3s ease-in-out infinite",
    opacity: 0.9,
    zIndex: 1
  }
};

export default LoginBanner;
