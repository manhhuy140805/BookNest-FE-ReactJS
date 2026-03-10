import React from "react";
import { ReadOutlined } from "@ant-design/icons";

const RegisterBanner = () => {
  return (
    <div
      className="hidden-mobile"
      style={{
        flex: 1,
        background: "linear-gradient(135deg, #ff5c35 0%, #ff8e53 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "40px",
        position: "relative",
      }}
    >
      {/* Abstract Circles Background */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }}
      />

      <ReadOutlined style={{ fontSize: "80px", marginBottom: "20px" }} />
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          margin: "0 0 20px 0",
          color: "white",
        }}
      >
        BookNest
      </h1>
      <p
        style={{
          fontSize: "18px",
          textAlign: "center",
          maxWidth: "400px",
          lineHeight: "1.6",
        }}
      >
        Join thousands of book lovers. Discover, review, and share your favorite
        books.
      </p>
    </div>
  );
};

export default RegisterBanner;
