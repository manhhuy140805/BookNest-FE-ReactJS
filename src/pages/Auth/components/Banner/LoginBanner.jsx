import React from "react";
import { BookOutlined, StarFilled, CommentOutlined } from "@ant-design/icons";
import Banner from "./Banner";

const LoginBanner = () => {
  const features = [
    { icon: <BookOutlined />, text: "Thousands of Books" },
    { icon: <StarFilled />, text: "Curated Collections" },
    { icon: <CommentOutlined />, text: "Reader Community" },
  ];

  return (
    <Banner
      logo="/images/logo/logo-text-white.png"
      heading="Find Your Next Favorite Book"
      highlight="Click Away"
      description="Join BookNest and explore thousands of books, track your reading goals, and connect with readers who share your passion for stories."
      features={features}
    />
  );
};

export default LoginBanner;
