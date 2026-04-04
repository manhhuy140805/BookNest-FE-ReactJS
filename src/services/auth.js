import apiClient from "../config/api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * Register new account
 * @param {Object} data - { email, password, fullName }
 */
export const register = (data) => {
  return apiClient.post("/auth/register", data);
};

/**
 * Login to account
 * @param {Object} data - { email, password }
 */
export const login = (data) => {
  return apiClient.post("/auth/login", data);
};

/**
 * Start Google OAuth login flow by redirecting browser to backend endpoint.
 */
export const loginWithGoogle = () => {
  window.location.href = `${API_BASE_URL}/auth/google`;
};

/**
 * Extract auth tokens from callback URL query params.
 * @param {string} search - window.location.search
 */
export const extractTokensFromUrl = (search) => {
  const params = new URLSearchParams(search);
  const accessToken = params.get("access_token") || params.get("token") || "";
  const refreshToken = params.get("refresh_token") || "";

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

/**
 * Get current user info
 */
export const getCurrentUser = () => {
  return apiClient.get("/auth/me");
};

/**
 * Change password
 * @param {Object} data - { currentPassword, newPassword, confirmPassword }
 */
export const changePassword = (data) => {
  return apiClient.post("/auth/change-password", data);
};

/**
 * Verify email by direct verification link returned from backend.
 * @param {string} verifyLink
 */
export const verifyEmailByLink = (verifyLink) => {
  return apiClient.get(verifyLink);
};

/**
 * Request password reset
 * @param {Object} data - { email }
 */
export const forgotPassword = (data) => {
  return apiClient.post("/auth/forgot-password", data);
};

/**
 * Reset password with token
 * @param {Object} data - { token, newPassword, confirmPassword }
 */
export const resetPassword = (data) => {
  return apiClient.post("/auth/reset-password", data);
};
