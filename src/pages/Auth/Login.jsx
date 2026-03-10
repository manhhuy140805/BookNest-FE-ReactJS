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
        localStorage.setItem("access_token", access_token);
        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        const meResponse = await authService.getCurrentUser();
        login(meResponse.data, { access_token, refresh_token });

        message.success("Google login successful!");
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        navigate("/");
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
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
      const response = await authService.login({
        email: values.email,
        password: values.password,
      });
      const { access_token, refresh_token, user } = response.data;

      // Save to auth context and localStorage
      login(user, { access_token, refresh_token });

      message.success("Login successful!");

      // Redirect to home
      setTimeout(() => {
        navigate("/");
      }, 500);
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
      {/* Left Side - Banner */}
      <LoginBanner />

      {/* Right Side - Form */}
      <LoginForm
        onFinish={onFinish}
        loading={loading}
        onGoogleLogin={handleGoogleLogin}
        googleLoading={googleLoading}
      />

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

export default Login;
