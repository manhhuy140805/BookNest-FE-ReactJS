import React from "react";
import { BookOutlined, StarFilled, CommentOutlined } from "@ant-design/icons";
import Banner from "./Banner";

const RegisterBanner = () => {
  const features = [
    { icon: <BookOutlined />, text: "Thousands of Books" },
    { icon: <StarFilled />, text: "Curated Collections" },
    { icon: <CommentOutlined />, text: "Reader Community" },
  ];

  return (
    <Banner
      logo="/images/logo/logo-text-white.png"
      heading="Start Your Reading Journey"
      highlight="Today"
      description="Create your BookNest account to discover amazing books, build your personal library, and connect with a community of passionate readers."
      features={features}
    />
  );
};

export default RegisterBanner;
