import React, { useState } from "react";
import { Button, Form, Input, Checkbox, Modal } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const RegisterForm = ({ onFinish, loading }) => {
  const [termsModalVisible, setTermsModalVisible] = useState(false);
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
          <h2 style={styles.title}>Create Your Account</h2>
          <p style={styles.subtitle}>Join BookNest community today</p>
        </motion.div>

        <Form
          name="register_form"
          className="register-form"
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
          <motion.div variants={itemVariants}>
            <Form.Item
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
                { min: 2, message: "Full name must be at least 2 characters" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={styles.inputIcon} />}
                placeholder="Full Name"
                style={styles.input}
              />
            </Form.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={styles.inputIcon} />}
                placeholder="Email Address"
                style={styles.input}
              />
            </Form.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={styles.inputIcon} />}
                placeholder="Password"
                style={styles.input}
              />
            </Form.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
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
              <Form.Item name="agree" valuePropName="checked" noStyle>
                <Checkbox style={styles.checkbox}>
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setTermsModalVisible(true);
                    }}
                    style={styles.termsLink}
                  >
                    Terms and Conditions
                  </button>
                </Checkbox>
              </Form.Item>
            </Form.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={styles.registerButton}
              >
                Sign up
              </Button>
            </Form.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div style={styles.divider}>
              <span style={styles.dividerText}>Or sign up with</span>
              <div style={styles.dividerLine}></div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              icon={<GoogleOutlined />}
              block
              onClick={() => console.log("Google signup")}
              style={styles.googleButton}
            >
              Google
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div style={styles.footer}>
              Already have an account?{" "}
              <Link to="/login" style={styles.loginLink}>
                Login here
              </Link>
            </div>
          </motion.div>
        </Form>

        {/* Terms and Conditions Modal */}
        <Modal
          title="Terms and Conditions"
          open={termsModalVisible}
          onCancel={() => setTermsModalVisible(false)}
          footer={[
            <Button
              key="close"
              type="primary"
              onClick={() => setTermsModalVisible(false)}
            >
              Close
            </Button>,
          ]}
          width={600}
          style={{ top: 20 }}
        >
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <h3>Terms and Conditions</h3>
            <p>
              <strong>Last Updated: March 27, 2026</strong>
            </p>
            <h4>1. User Agreement</h4>
            <p>
              By registering for and using BookNest, you agree to comply with
              these Terms and Conditions. If you do not agree, please do not use
              our service.
            </p>

            <h4>2. Account Responsibility</h4>
            <p>
              You are responsible for maintaining the confidentiality of your
              account information and password. You agree to accept
              responsibility for all activities that occur under your account.
            </p>

            <h4>3. User Conduct</h4>
            <p>
              Users agree not to:
              <ul>
                <li>
                  Download, copy, or distribute copyrighted content without
                  permission
                </li>
                <li>Engage in harassment or abusive behavior</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Post spam, viruses, or malicious content</li>
              </ul>
            </p>

            <h4>4. Intellectual Property</h4>
            <p>
              All content on BookNest, including text, graphics, logos, and
              images, is the property of BookNest or its content suppliers and
              is protected by international copyright laws.
            </p>

            <h4>5. Limitation of Liability</h4>
            <p>
              BookNest shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use the service.
            </p>

            <h4>6. Termination</h4>
            <p>
              BookNest reserves the right to terminate or suspend your account
              at any time for violations of these terms or for any other reason
              at our discretion.
            </p>

            <h4>7. Changes to Terms</h4>
            <p>
              BookNest may modify these terms at any time. Your continued use of
              the service following the posting of revised terms means that you
              accept and agree to the changes.
            </p>

            <h4>8. Governing Law</h4>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of the jurisdiction in which BookNest
              operates.
            </p>
          </div>
        </Modal>
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
  checkbox: {
    color: "#8c8c8c",
    fontSize: "14px",
  },
  registerButton: {
    height: "52px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#ff6b6b",
    border: "none",
    boxShadow: "0 4px 14px 0 rgba(255, 107, 107, 0.39)",
    transition: "all 0.3s",
  },
  divider: {
    textAlign: "center",
    margin: "24px 0",
    position: "relative",
  },
  dividerText: {
    backgroundColor: "#fff",
    padding: "0 16px",
    color: "#8c8c8c",
    fontSize: "14px",
    position: "relative",
    zIndex: 1,
  },
  dividerLine: {
    position: "absolute",
    top: "50%",
    left: "0",
    right: "0",
    borderTop: "1px solid #f0f0f0",
    zIndex: 0,
  },
  googleButton: {
    height: "52px",
    borderRadius: "12px",
    borderColor: "#e6e6e6",
    color: "#595959",
    fontWeight: "500",
    fontSize: "15px",
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
  termsLink: {
    background: "none",
    border: "none",
    color: "#ff6b6b",
    fontWeight: "600",
    cursor: "pointer",
    padding: 0,
    textDecoration: "underline",
    fontSize: "14px",
    transition: "all 0.3s",
  },
};

export default RegisterForm;
