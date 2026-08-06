type AppShellProps = {
  children: React.ReactNode;
};

function AppShell({ children }: AppShellProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAFAFA",
        color: "#111827",
      }}
    >
      {children}
    </div>
  );
}

export default AppShell;