import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { App as AntdApp } from "antd";
import LoginBanner from "./components/LoginBanner";
import LoginForm from "./components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import * as authService from "../../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Handle Google OAuth callback
  useEffect(() => {
    const { access_token, refresh_token } = authService.extractTokensFromUrl(
      window.location.search,
    );

    if (!access_token) {
      return;
    }

    const completeGoogleLogin = async () => {
      setGoogleLoading(true);
      try {
        await login({ access_token, refresh_token });
        message.success("Google login successful!");
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Google login failed";
        message.error(errorMessage);
      } finally {
        setGoogleLoading(false);
      }
    };

    completeGoogleLogin();
  }, [login, message, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Call login API
      const response = await authService.login({
        email: values.email,
        password: values.password,
      });

      const { access_token, refresh_token } = response.data;

      // Login with tokens
      await login({ access_token, refresh_token });

      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    authService.loginWithGoogle();
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
      <LoginBanner />
      <LoginForm
        onFinish={onFinish}
        loading={loading}
        onGoogleLogin={handleGoogleLogin}
        googleLoading={googleLoading}
      />

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

export default Login;
