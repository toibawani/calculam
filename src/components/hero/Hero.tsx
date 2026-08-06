function Hero() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#FAFAFA",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 800,
            marginBottom: "16px",
          }}
        >
          Calculam
        </h1>

        <p
          style={{
            color: "#6B7280",
            fontSize: "1.2rem",
            marginBottom: "32px",
          }}
        >
          Modern Calculation Workspace
        </p>

        <button
          style={{
            padding: "14px 28px",
            borderRadius: "12px",
            border: "none",
            background: "#4F46E5",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}

export default Hero;