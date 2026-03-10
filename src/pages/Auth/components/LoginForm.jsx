import React from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const LoginForm = ({ onFinish, loading, onGoogleLogin, googleLoading }) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: "40px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginBottom: "10px",
            }}
          >
            Welcome Back!
          </h2>
          <p style={{ color: "#8c8c8c", fontSize: "16px" }}>
            Please login to your account
          </p>
        </div>

        <Form
          name="normal_login"
          className="login-form"
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
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{ color: "#bfbfbf" }}
                />
              }
              placeholder="Email Address"
              style={{ borderRadius: "8px", border: "1px solid #e6e6e6" }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  className="site-form-item-icon"
                  style={{ color: "#bfbfbf" }}
                />
              }
              type="password"
              placeholder="Password"
              style={{ borderRadius: "8px", border: "1px solid #e6e6e6" }}
            />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: "#8c8c8c" }}>Remember me</Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot"
                href=""
                style={{ color: "#ff5c35", fontWeight: "500" }}
              >
                Forgot password?
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              loading={loading}
              style={{
                boxShadow: "0 4px 14px 0 rgba(255, 92, 53, 0.39)",
                border: "none",
                height: "50px",
              }}
            >
              Log in
            </Button>
          </Form.Item>

          <div
            style={{
              textAlign: "center",
              margin: "20px 0",
              position: "relative",
            }}
          >
            <span
              style={{
                backgroundColor: "#fff",
                padding: "0 10px",
                color: "#8c8c8c",
                position: "relative",
                zIndex: 1,
              }}
            >
              Or login with
            </span>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                right: "0",
                borderTop: "1px solid #f0f0f0",
                zIndex: 0,
              }}
            ></div>
          </div>

          <Button
            icon={<GoogleOutlined />}
            block
            onClick={onGoogleLogin}
            loading={googleLoading}
            style={{
              height: "50px",
              borderRadius: "30px",
              borderColor: "#e6e6e6",
              color: "#595959",
              fontWeight: "500",
            }}
          >
            Google
          </Button>

          <div
            style={{ textAlign: "center", marginTop: "30px", color: "#8c8c8c" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#ff5c35", fontWeight: "bold" }}
            >
              Register now
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
