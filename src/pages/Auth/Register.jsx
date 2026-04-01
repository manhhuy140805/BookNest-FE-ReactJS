import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App as AntdApp, Button, Modal, Typography } from "antd";
import RegisterBanner from "./components/Banner/RegisterBanner";
import RegisterForm from "./components/RegisterForm";
import * as authService from "../../services/auth";

const Register = () => {
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verificationLink, setVerificationLink] = useState("");

  const extractVerificationLink = (responseData) => {
    return (
      responseData?.verificationLink ||
      responseData?.verification_link ||
      responseData?.verifyLink ||
      responseData?.verifyUrl ||
      responseData?.verificationUrl ||
      responseData?.data?.verificationLink ||
      responseData?.data?.verification_link ||
      ""
    );
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authService.register({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      });

      const link = extractVerificationLink(response?.data);

      if (link) {
        setVerificationLink(link);
        setIsVerifyModalOpen(true);
        message.success(
          "Registration successful. Click the button to verify email.",
        );
      } else {
        message.success(
          "Registration successful! Please check your email to verify your account.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!verificationLink) {
      message.error("Verification link is missing.");
      return;
    }

    setVerifying(true);
    try {
      const response = await authService.verifyEmailByLink(verificationLink);
      const redirectUrl = response?.data?.redirectUrl;
      const successMessage =
        response?.data?.message || "Email verified successfully.";

      message.success(successMessage, 2);
      setIsVerifyModalOpen(false);

      // Delay redirect so the user can see verification success notification.
      setTimeout(() => {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          navigate("/login");
        }
      }, 1200);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Email verification failed";
      message.error(errorMessage);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f8f9fa",
        overflow: "hidden",
      }}
    >
      {/* Left Side - Banner */}
      <RegisterBanner />

      {/* Right Side - Form */}
      <RegisterForm onFinish={onFinish} loading={loading} />

      <Modal
        title="Email Verification"
        open={isVerifyModalOpen}
        onCancel={() => setIsVerifyModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsVerifyModalOpen(false)}>
            Close
          </Button>,
          <Button key="login" onClick={() => navigate("/login")}>
            Go To Login
          </Button>,
          <Button
            key="verify"
            type="primary"
            onClick={handleVerifyEmail}
            loading={verifying}
          >
            Verify Email
          </Button>,
        ]}
      >
        <Typography.Paragraph>
          Demo mode: backend returned a direct verification link. Click{" "}
          <b>Verify Email</b> to call backend verification endpoint.
        </Typography.Paragraph>
        <Typography.Paragraph copyable={{ text: verificationLink }}>
          {verificationLink}
        </Typography.Paragraph>
      </Modal>

      {/* CSS Inline for responsive hide */}
      <style>{`
                @media (max-width: 768px) {
                    .hidden-mobile {
                        display: none !important;
                    }
                }
            `}</style>
    </div>
  );
};

export default Register;
