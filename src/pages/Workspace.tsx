import {
  Calculator,
  Clock3,
  Command,
  History,
  Settings2,
  Sparkles,
} from "lucide-react";

export default function Workspace() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f9fc",
        color: "#111827",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <header
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          borderBottom: "1px solid #e5e7eb",
          background: "rgba(255,255,255,.88)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 750,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              borderRadius: 10,
              color: "white",
              background: "#4f46e5",
            }}
          >
            <Calculator size={19} />
          </div>

          Calculam
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <button
            title="Command Center"
            style={{
              width: 38,
              height: 38,
              display: "grid",
              placeItems: "center",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              background: "white",
              cursor: "pointer",
            }}
          >
            <Command size={17} />
          </button>

          <button
            title="Settings"
            style={{
              width: 38,
              height: 38,
              display: "grid",
              placeItems: "center",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              background: "white",
              cursor: "pointer",
            }}
          >
            <Settings2 size={17} />
          </button>
        </div>
      </header>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#6366f1",
            fontSize: 13,
            fontWeight: 650,
          }}
        >
          <Sparkles size={16} />
          Calculation Workspace
        </div>

        <h1
          style={{
            margin: "10px 0 8px",
            fontSize: 38,
            letterSpacing: "-.045em",
          }}
        >
          Your calculations,
          <br />
          all in one place.
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: 600,
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          Calculate, convert and revisit your work without jumping
          between different tools.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 42,
          }}
        >
          <WorkspaceCard
            icon={<Calculator size={21} />}
            title="Calculator"
            description="Fast everyday calculations."
            accent="#4f46e5"
          />

          <WorkspaceCard
            icon={<Clock3 size={21} />}
            title="Quick calculations"
            description="Get answers without losing context."
            accent="#0891b2"
          />

          <WorkspaceCard
            icon={<History size={21} />}
            title="History"
            description="Keep track of previous calculations."
            accent="#7c3aed"
          />
        </div>
      </div>
    </main>
  );
}

function WorkspaceCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <button
      style={{
        textAlign: "left",
        padding: 24,
        minHeight: 180,
        border: "1px solid #e5e7eb",
        borderRadius: 18,
        background: "white",
        cursor: "pointer",
        boxShadow: "0 8px 25px rgba(15,23,42,.04)",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          display: "grid",
          placeItems: "center",
          marginBottom: 28,
          color: accent,
          background: `${accent}12`,
          borderRadius: 12,
        }}
      >
        {icon}
      </div>

      <strong
        style={{
          display: "block",
          fontSize: 17,
          marginBottom: 7,
        }}
      >
        {title}
      </strong>

      <span
        style={{
          color: "#94a3b8",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        {description}
      </span>
    </button>
  );
}