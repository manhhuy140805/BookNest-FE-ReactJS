import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App as AntdApp, Modal, Button, Input } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import ForgotPasswordBanner from "./components/Banner/ForgotPasswordBanner";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import * as authService from "../../services/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetUrl, setResetUrl] = useState("");

  const handleVerifyAndContinue = () => {
    try {
      // Extract token from reset URL
      const url = new URL(resetUrl);
      const token = url.searchParams.get("token");

      if (token) {
        // Close modal and navigate to reset password page
        setIsResetModalOpen(false);
        setResetUrl("");
        navigate(`/reset-password?token=${token}`);
      } else {
        message.error("Invalid reset link. Token not found.");
      }
    } catch {
      message.error("Failed to parse reset link.");
    }
  };

  const handleCloseModal = () => {
    setIsResetModalOpen(false);
    setResetUrl("");
    navigate("/login");
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authService.forgotPassword({
        email: values.email,
      });

      const data = response.data;

      // Check if in demo mode with reset URL
      if (data?.demoMode && data?.resetUrl) {
        setResetUrl(data.resetUrl);
        setIsResetModalOpen(true);
        message.info("Demo mode: Reset link is shown below", 2);
      } else {
        // Normal mode - redirect to login
        message.success(
          "Password reset link has been sent to your email. Please check your inbox.",
          2,
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send reset link";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={styles.container}>
        <ForgotPasswordBanner />
        <ForgotPasswordForm
          onFinish={onFinish}
          loading={loading}
          step="email"
        />

        <style>{`
          @media (max-width: 768px) {
            .hidden-mobile {
              display: none !important;
            }
          }
        `}</style>
      </div>

      {/* Demo Mode Reset Link Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircleOutlined
              style={{ color: "#52c41a", fontSize: "20px" }}
            />
            <span>Reset Password Link (Demo Mode)</span>
          </div>
        }
        open={isResetModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={600}
      >
        <div style={styles.modalContent}>
          <p style={styles.demoWarning}>
            ✓ <strong>Email Sent!</strong> Click the button below to proceed with
            resetting your password.
          </p>

          <Button
            block
            type="primary"
            size="large"
            onClick={handleVerifyAndContinue}
            style={styles.verifyButton}
          >
            Verify & Reset Password
          </Button>

          <div style={styles.steps}>
            <p style={styles.stepsTitle}>Next steps:</p>
            <ol>
              <li>
                Click <strong>"Verify & Reset Password"</strong> to continue
              </li>
              <li>Enter your new password</li>
              <li>Click "Reset Password" to confirm</li>
            </ol>
          </div>

          <Button
            block
            type="primary"
            size="large"
            onClick={handleCloseModal}
            style={styles.continueButton}
          >
            Continue to Login
          </Button>
        </div>
      </Modal>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f8f9fa",
  },
  modalContent: {
    padding: "20px 0",
  },
  demoWarning: {
    backgroundColor: "#e6f7ff",
    border: "1px solid #91d5ff",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "20px",
    color: "#0050b3",
    fontSize: "14px",
  },
  verifyButton: {
    height: "44px",
    fontSize: "15px",
    fontWeight: "600",
    backgroundColor: "#52c41a",
    borderColor: "#52c41a",
    marginTop: "12px",
    marginBottom: "16px",
  },
  steps: {
    backgroundColor: "#fafafa",
    border: "1px solid #f0f0f0",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
  },
  stepsTitle: {
    fontWeight: "600",
    marginBottom: "8px",
    color: "#333",
  },
  continueButton: {
    height: "44px",
    fontSize: "15px",
    fontWeight: "600",
    backgroundColor: "#ff6b6b",
    borderColor: "#ff6b6b",
  },
};

export default ForgotPassword;
