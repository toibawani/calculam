import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import CalculatorGrid from "../components/workspace/CalculatorGrid";

function Workspace() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 72px)",
        padding: "72px 24px 100px",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <WorkspaceHeader />

        <div style={{ marginTop: "56px" }}>
          <CalculatorGrid />
        </div>
      </div>
    </main>
  );
}

export default Workspace;