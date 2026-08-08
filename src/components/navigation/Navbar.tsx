import { Calculator, Search } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: "72px",
        borderBottom: "1px solid #E5E7EB",
        background: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(18px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          height: "100%",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#111827",
            textDecoration: "none",
            fontWeight: 750,
            fontSize: "1.15rem",
          }}
        >
          <span
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              background: "#111827",
              color: "#FFFFFF",
            }}
          >
            <Calculator size={19} />
          </span>

          Calculam
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link
            to="/"
            style={{
              padding: "9px 13px",
              color: "#4B5563",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 550,
            }}
          >
            Home
          </Link>

          <Link
            to="/workspace"
            style={{
              padding: "9px 13px",
              color: "#4B5563",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 550,
            }}
          >
            Workspace
          </Link>

          <Link
            to="/about"
            style={{
              padding: "9px 13px",
              color: "#4B5563",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 550,
            }}
          >
            About
          </Link>

          <button
            aria-label="Search"
            style={{
              width: "40px",
              height: "40px",
              marginLeft: "8px",
              display: "grid",
              placeItems: "center",
              border: "1px solid #E5E7EB",
              borderRadius: "11px",
              background: "#FFFFFF",
              color: "#4B5563",
              cursor: "pointer",
            }}
          >
            <Search size={18} />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;