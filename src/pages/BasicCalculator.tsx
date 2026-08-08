import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import BasicCalculator from "../features/calculator/BasicCalculator";

function BasicCalculatorPage() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 72px)",
        padding: "56px 24px 90px",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/workspace"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            color: "#64748B",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          Back to workspace
        </Link>

        <div
          style={{
            marginTop: "36px",
            display: "grid",
            gridTemplateColumns: "1fr minmax(320px, 440px)",
            gap: "70px",
            alignItems: "center",
          }}
        >
          <section>
            <p
              style={{
                margin: 0,
                color: "#4F46E5",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Basic Calculator
            </p>

            <h1
              style={{
                margin: "14px 0 0",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: "#111827",
              }}
            >
              Simple.
              <br />
              Precise.
              <br />
              Fast.
            </h1>

            <p
              style={{
                maxWidth: "470px",
                marginTop: "24px",
                color: "#64748B",
                lineHeight: 1.75,
              }}
            >
              A focused calculator for everyday arithmetic with keyboard
              support, expressions and a clean calculation interface.
            </p>
          </section>

          <BasicCalculator />
        </div>
      </div>
    </main>
  );
}

export default BasicCalculatorPage;