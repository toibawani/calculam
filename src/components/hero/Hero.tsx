import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        padding: "96px 24px",
        background:
          "radial-gradient(circle at 50% 0%, #eef2ff 0%, #f8fafc 42%, #f8fafc 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px",
            border: "1px solid #e0e7ff",
            borderRadius: "999px",
            background: "#ffffff",
            color: "#4f46e5",
            fontSize: "0.88rem",
            fontWeight: 650,
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
          }}
        >
          <Sparkles size={15} />
          A modern calculation workspace
        </div>

        <h1
          style={{
            margin: "28px 0 0",
            fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.06em",
            fontWeight: 800,
            color: "#111827",
          }}
        >
          Calculate
          <br />
          <span style={{ color: "#4f46e5" }}>without friction.</span>
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "28px auto 0",
            fontSize: "1.15rem",
            lineHeight: 1.75,
            color: "#64748b",
          }}
        >
          Calculam brings everyday mathematics, science, finance, statistics
          and programming calculations into one focused workspace.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/workspace"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "14px 20px",
              borderRadius: "13px",
              background: "#111827",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 650,
              fontSize: "0.95rem",
            }}
          >
            Open Workspace
            <ArrowRight size={17} />
          </Link>

          <Link
            to="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 20px",
              borderRadius: "13px",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              color: "#334155",
              textDecoration: "none",
              fontWeight: 650,
              fontSize: "0.95rem",
            }}
          >
            Learn about Calculam
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            marginTop: "64px",
            flexWrap: "wrap",
            color: "#94a3b8",
            fontSize: "0.82rem",
            fontWeight: 550,
          }}
        >
          <span>Fast</span>
          <span>•</span>
          <span>Focused</span>
          <span>•</span>
          <span>Built for real calculations</span>
        </div>
      </div>
    </main>
  );
}

export default Hero;