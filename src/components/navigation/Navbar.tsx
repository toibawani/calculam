function Navbar() {
  return (
    <header
      style={{
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 32px",
        borderBottom: "1px solid #E5E7EB",
        background: "#FFFFFF",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: 700,
        }}
      >
        Calculam
      </h2>

      <nav
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <a href="#">Home</a>
        <a href="#">Tools</a>
        <a href="#">About</a>
      </nav>
    </header>
  );
}

export default Navbar;