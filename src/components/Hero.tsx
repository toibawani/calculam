function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "700px",
        }}
      >
        <p
          style={{
            color: "#4F46E5",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Welcome to
        </p>

        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 800,
            marginBottom: "1rem",
          }}
        >
          Calculam
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#6B7280",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}
        >
          A modern calculation workspace designed for students,
          developers, engineers and everyday life.
        </p>

        <button
          style={{
            padding: "14px 30px",
            border: "none",
            borderRadius: "14px",
            background: "#4F46E5",
            color: "white",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Hero;