import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { App as AntdApp, Spin } from "antd";
import ForgotPasswordBanner from "./components/Banner/ForgotPasswordBanner";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import * as authService from "../../services/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [token, setToken] = useState("");
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    // Extract token from URL query params
    const tokenFromUrl = searchParams.get("token");

    if (!tokenFromUrl) {
      message.error("Invalid reset link. Missing token.");
      setTimeout(() => {
        navigate("/forgot-password");
      }, 1500);
      return;
    }

    setToken(tokenFromUrl);
    setValidToken(true);
    setVerifying(false);
  }, [searchParams, navigate, message]);

  const onFinish = async (values) => {
    if (!token) {
      message.error("Reset token is missing.");
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword({
        token: token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      message.success(
        "Password reset successful! You can now login with your new password.",
        2,
      );

      // Redirect to login after delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password";
      message.error(errorMessage);

      // If token is invalid/expired, redirect to forgot password
      if (error.response?.status === 400 || error.response?.status === 401) {
        setTimeout(() => {
          navigate("/forgot-password");
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Spin size="large" description="Verifying reset link..." />
      </div>
    );
  }

  if (!validToken) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Invalid Reset Link</h2>
          <p>This reset link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <ForgotPasswordBanner />
      <ForgotPasswordForm onFinish={onFinish} loading={loading} step="reset" />

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

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f8f9fa",
  },
};

export default ResetPassword;
