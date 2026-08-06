import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

function AppShell({ children }: AppShellProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        color: "#111827",
      }}
    >
      {children}
    </div>
  );
}

export default AppShell;