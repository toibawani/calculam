type CalculatorDisplayProps = {
  expression: string;
  result: string;
};

function CalculatorDisplay({
  expression,
  result,
}: CalculatorDisplayProps) {
  return (
    <div
      style={{
        minHeight: "150px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderRadius: "24px",
        background: "#0F172A",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "28px",
          textAlign: "right",
          color: "#94A3B8",
          fontSize: "1rem",
          overflowWrap: "anywhere",
        }}
      >
        {expression || " "}
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "10px",
          textAlign: "right",
          fontSize: "clamp(2.2rem, 7vw, 3.8rem)",
          lineHeight: 1,
          fontWeight: 650,
          letterSpacing: "-0.04em",
          overflowWrap: "anywhere",
        }}
      >
        {result || "0"}
      </div>
    </div>
  );
}

export default CalculatorDisplay;