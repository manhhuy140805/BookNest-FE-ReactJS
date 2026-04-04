import React from "react";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ForgotPasswordForm = ({ onFinish, loading, step = "email" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.formWrapper}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div style={styles.header} variants={itemVariants}>
          <h2 style={styles.title}>Reset Password</h2>
          <p style={styles.subtitle}>
            {step === "email"
              ? "Enter your email address and we'll send you a link to reset your password"
              : "Enter your new password"}
          </p>
        </motion.div>

        <Form
          name="forgot_password"
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
          {step === "email" && (
            <>
              <motion.div variants={itemVariants}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                    { type: "email", message: "Invalid email format" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={styles.inputIcon} />}
                    placeholder="Email Address"
                    style={styles.input}
                  />
                </Form.Item>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    style={styles.submitButton}
                  >
                    Send Reset Link
                  </Button>
                </Form.Item>
              </motion.div>
            </>
          )}

          {step === "reset" && (
            <>
              <motion.div variants={itemVariants}>
                <Form.Item
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new Password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={styles.inputIcon} />}
                    placeholder="New Password"
                    style={styles.input}
                  />
                </Form.Item>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match"),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={styles.inputIcon} />}
                    placeholder="Confirm Password"
                    style={styles.input}
                  />
                </Form.Item>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    style={styles.submitButton}
                  >
                    Reset Password
                  </Button>
                </Form.Item>
              </motion.div>
            </>
          )}

          <motion.div variants={itemVariants}>
            <div style={styles.footer}>
              Remember your password?{" "}
              <Link to="/login" style={styles.loginLink}>
                Back to Login
              </Link>
            </div>
          </motion.div>
        </Form>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "40px 20px",
    minHeight: "100vh",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "440px",
  },
  header: {
    marginBottom: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "12px",
    margin: 0,
  },
  subtitle: {
    color: "#8c8c8c",
    fontSize: "16px",
    margin: "12px 0 0 0",
  },
  input: {
    borderRadius: "12px",
    border: "1px solid #e6e6e6",
    padding: "12px 16px",
    fontSize: "15px",
    transition: "all 0.3s",
  },
  inputIcon: {
    color: "#bfbfbf",
    fontSize: "18px",
  },
  submitButton: {
    height: "52px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#ff6b6b",
    border: "none",
    boxShadow: "0 4px 14px 0 rgba(255, 107, 107, 0.39)",
    transition: "all 0.3s",
  },
  footer: {
    textAlign: "center",
    marginTop: "32px",
    color: "#8c8c8c",
    fontSize: "15px",
  },
  loginLink: {
    color: "#ff6b6b",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default ForgotPasswordForm;
