import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
};

function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const styles = {
    primary: {
      background: "#111827",
      color: "#FFFFFF",
      border: "1px solid #111827",
    },
    secondary: {
      background: "#FFFFFF",
      color: "#111827",
      border: "1px solid #E5E7EB",
    },
    ghost: {
      background: "transparent",
      color: "#4B5563",
      border: "1px solid transparent",
    },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: "12px 18px",
        borderRadius: "12px",
        fontSize: "0.95rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 160ms ease",
      }}
    >
      {children}
    </button>
  );
}

export default Button;