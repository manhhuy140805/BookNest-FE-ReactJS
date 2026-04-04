import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./SessionExpiredModal.module.css";

/**
 * SessionExpiredModal - shown when the access token is detected as expired.
 * User can choose to go to login or continue as a guest (unauthenticated).
 */
export default function SessionExpiredModal({ onClose }) {
  const { clearAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    clearAuth();
    onClose();
    navigate("/login");
  };

  const handleContinueAsGuest = () => {
    clearAuth();
    onClose();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="session-expired-title">
      <div className={styles.modal}>
        {/* Icon */}
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="url(#grad)" strokeWidth="3" />
            <path
              d="M32 18v16"
              stroke="url(#grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="32" cy="43" r="2.5" fill="url(#grad)" />
            <defs>
              <linearGradient id="grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f97316" />
                <stop offset="1" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.iconGlow} />
        </div>

        {/* Text content */}
        <h2 id="session-expired-title" className={styles.title}>
          Phiên đăng nhập hết hạn
        </h2>
        <p className={styles.description}>
          Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp
          tục sử dụng đầy đủ tính năng, hoặc tiếp tục duyệt sách với tư cách
          khách.
        </p>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            id="session-expired-login-btn"
            className={styles.loginButton}
            onClick={handleLogin}
          >
            <span className={styles.loginIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            Đăng nhập lại
          </button>

          <button
            id="session-expired-guest-btn"
            className={styles.guestButton}
            onClick={handleContinueAsGuest}
          >
            Tiếp tục không đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
