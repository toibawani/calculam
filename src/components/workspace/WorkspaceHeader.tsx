import { Search } from "lucide-react";

function WorkspaceHeader() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
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
            Workspace
          </p>

          <h1
            style={{
              margin: "10px 0 0",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#111827",
            }}
          >
            What do you need
            <br />
            to calculate?
          </h1>

          <p
            style={{
              maxWidth: "560px",
              margin: "18px 0 0",
              color: "#64748B",
              lineHeight: 1.7,
            }}
          >
            Choose a calculation workspace or search for the tool you need.
          </p>
        </div>

        <div
          style={{
            width: "min(100%, 320px)",
            height: "46px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 14px",
            border: "1px solid #E2E8F0",
            borderRadius: "13px",
            background: "#FFFFFF",
          }}
        >
          <Search size={18} color="#94A3B8" />

          <input
            type="search"
            placeholder="Search calculators..."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              color: "#111827",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkspaceHeader;