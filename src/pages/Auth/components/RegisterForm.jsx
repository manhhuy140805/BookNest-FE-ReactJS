import React from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RegisterForm = ({ onFinish, loading }) => {
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
            Create Account
          </h2>
          <p style={{ color: "#8c8c8c", fontSize: "16px" }}>
            Join BookNest community today
          </p>
        </div>

        <Form
          name="register_form"
          className="register-form"
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
              { min: 2, message: "Full name must be at least 2 characters" },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{ color: "#bfbfbf" }}
                />
              }
              placeholder="Full Name"
              style={{ borderRadius: "8px", border: "1px solid #e6e6e6" }}
            />
          </Form.Item>

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
            rules={[
              { required: true, message: "Please input your Password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
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
              prefix={
                <LockOutlined
                  className="site-form-item-icon"
                  style={{ color: "#bfbfbf" }}
                />
              }
              type="password"
              placeholder="Confirm Password"
              style={{ borderRadius: "8px", border: "1px solid #e6e6e6" }}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="agree" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#8c8c8c" }}>
                I agree to the Terms and Conditions
              </Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              block
              loading={loading}
              style={{
                boxShadow: "0 4px 14px 0 rgba(255, 92, 53, 0.39)",
                border: "none",
                height: "50px",
              }}
            >
              Sign up
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
              Or sign up with
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
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#ff5c35", fontWeight: "bold" }}>
              Login here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
