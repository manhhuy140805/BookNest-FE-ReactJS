/**
 * Decode a JWT token payload without verifying signature.
 * @param {string} token - JWT token string
 * @returns {object|null} Decoded payload or null if invalid
 */
export function decodeJwt(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Base64url decode the payload (index 1)
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Check if the given JWT token is expired.
 * @param {string} token - JWT token string
 * @returns {boolean} true if expired or invalid, false if still valid
 */
export function isTokenExpired(token) {
  if (!token) return true;
  const payload = decodeJwt(token);
  if (!payload || !payload.exp) return true;

  // exp is in seconds, Date.now() is in milliseconds
  return Date.now() >= payload.exp * 1000;
}
