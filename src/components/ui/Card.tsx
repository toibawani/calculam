import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
      }}
    >
      {children}
    </div>
  );
}

export default Card;