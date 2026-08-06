import Navbar from "./components/navigation/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#FAFAFA",
          color: "#111827",
          fontFamily: "Inter, sans-serif",
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
              fontSize: "1.2rem",
              color: "#6B7280",
              marginBottom: "32px",
            }}
          >
            Modern Calculation Workspace
          </p>

          <button
            style={{
              padding: "14px 28px",
              borderRadius: "14px",
              border: "none",
              background: "#4F46E5",
              color: "#FFFFFF",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
        </div>
      </main>
    </>
  );
}

export default App;