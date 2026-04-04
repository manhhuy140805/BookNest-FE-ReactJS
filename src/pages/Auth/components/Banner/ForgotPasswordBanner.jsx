import React from "react";
import { LockOutlined, SafetyOutlined, MailOutlined } from "@ant-design/icons";
import Banner from "./Banner";

const ForgotPasswordBanner = () => {
  const features = [
    { icon: <MailOutlined />, text: "Email Verification" },
    { icon: <LockOutlined />, text: "Secure Reset Link" },
    { icon: <SafetyOutlined />, text: "Password Protection" },
  ];

  return (
    <Banner
      logo="/images/logo/logo-text-white.png"
      heading="Recover Your Account"
      highlight="Quickly"
      description="Don't worry, we'll help you reset your password. You'll receive a secure link via email to create a new password."
      features={features}
    />
  );
};

export default ForgotPasswordBanner;
