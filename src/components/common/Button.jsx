export default function Button({
  text,
  onClick,
  variant = "primary",
  icon,
  className = "",
}) {
  const baseStyle = {
    padding: "clamp(10px, 1.2vw, 12px) clamp(16px, 2vw, 28px)",
    fontSize: "clamp(14px, 1.2vw, 16px)",
    fontWeight: "500",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  };

  const variants = {
    primary: {
      backgroundColor: "#fff",
      color: "#1a1a2e",
      border: "2px solid #fff",
    },
    secondary: {
      backgroundColor: "#ff6b6b",
      color: "#fff",
      border: "2px solid #ff6b6b",
    },
  };

  return (
    <button
      onClick={onClick}
      className={className}
      style={{ ...baseStyle, ...variants[variant] }}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
}
