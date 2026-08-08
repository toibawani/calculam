import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type CalculatorCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
};

function CalculatorCard({
  title,
  description,
  icon: Icon,
  path,
}: CalculatorCardProps) {
  return (
    <Link
      to={path}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <article
        style={{
          minHeight: "190px",
          padding: "24px",
          border: "1px solid #E2E8F0",
          borderRadius: "20px",
          background: "#FFFFFF",
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
          transition: "transform 180ms ease, box-shadow 180ms ease",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            display: "grid",
            placeItems: "center",
            borderRadius: "12px",
            background: "#EEF2FF",
            color: "#4F46E5",
          }}
        >
          <Icon size={21} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            marginTop: "22px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {title}
            </h3>

            <p
              style={{
                margin: "8px 0 0",
                color: "#64748B",
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
          </div>

          <ArrowUpRight size={19} color="#94A3B8" />
        </div>
      </article>
    </Link>
  );
}

export default CalculatorCard;