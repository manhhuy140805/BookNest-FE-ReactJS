import React from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const LoginForm = ({ onFinish, loading, onGoogleLogin, googleLoading }) => {
  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back!</h2>
          <p style={styles.subtitle}>Please login to your account</p>
        </div>

        <Form
          name="normal_login"
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
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

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={styles.inputIcon} />}
              placeholder="Password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <div style={styles.rememberRow}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={styles.checkbox}>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={styles.loginButton}
            >
              Log in
            </Button>
          </Form.Item>

          <div style={styles.divider}>
            <span style={styles.dividerText}>Or continue with</span>
            <div style={styles.dividerLine}></div>
          </div>

          <Button
            icon={<GoogleOutlined />}
            block
            onClick={onGoogleLogin}
            loading={googleLoading}
            style={styles.googleButton}
          >
            Google
          </Button>

          <div style={styles.footer}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.registerLink}>
              Register now
            </Link>
          </div>
        </Form>
      </div>
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
    minHeight: "100vh"
  },
  formWrapper: {
    width: "100%",
    maxWidth: "440px"
  },
  header: {
    marginBottom: "40px",
    textAlign: "center"
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "12px",
    margin: 0
  },
  subtitle: {
    color: "#8c8c8c",
    fontSize: "16px",
    margin: "12px 0 0 0"
  },
  input: {
    borderRadius: "12px",
    border: "1px solid #e6e6e6",
    padding: "12px 16px",
    fontSize: "15px",
    transition: "all 0.3s"
  },
  inputIcon: {
    color: "#bfbfbf",
    fontSize: "18px"
  },
  rememberRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  checkbox: {
    color: "#8c8c8c",
    fontSize: "14px"
  },
  forgotLink: {
    color: "#ff6b6b",
    fontWeight: "500",
    fontSize: "14px",
    textDecoration: "none"
  },
  loginButton: {
    height: "52px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#ff6b6b",
    border: "none",
    boxShadow: "0 4px 14px 0 rgba(255, 107, 107, 0.39)",
    transition: "all 0.3s"
  },
  divider: {
    textAlign: "center",
    margin: "24px 0",
    position: "relative"
  },
  dividerText: {
    backgroundColor: "#fff",
    padding: "0 16px",
    color: "#8c8c8c",
    fontSize: "14px",
    position: "relative",
    zIndex: 1
  },
  dividerLine: {
    position: "absolute",
    top: "50%",
    left: "0",
    right: "0",
    borderTop: "1px solid #f0f0f0",
    zIndex: 0
  },
  googleButton: {
    height: "52px",
    borderRadius: "12px",
    borderColor: "#e6e6e6",
    color: "#595959",
    fontWeight: "500",
    fontSize: "15px",
    transition: "all 0.3s"
  },
  footer: {
    textAlign: "center",
    marginTop: "32px",
    color: "#8c8c8c",
    fontSize: "15px"
  },
  registerLink: {
    color: "#ff6b6b",
    fontWeight: "600",
    textDecoration: "none"
  }
};

export default LoginForm;
