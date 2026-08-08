import { useState } from "react";
import {
  ArrowRight,
  Command,
  Sparkles,
} from "lucide-react";

import {
  executeCommand,
  type CommandResult,
} from "./commandEngine";

const examples = [
  "15% of 840",
  "sqrt 144",
  "25 * 18",
];

function CommandCenter() {
  const [input, setInput] = useState("");
  const [result, setResult] =
    useState<CommandResult | null>(null);

  const runCommand = (value = input) => {
    if (!value.trim()) {
      return;
    }

    setResult(executeCommand(value));
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "760px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          gap: "9px",
          color: "#4F46E5",
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <Sparkles size={16} />
        Calculam Command
      </div>

      <h2
        style={{
          margin: 0,
          color: "#111827",
          fontSize: "clamp(2rem, 5vw, 3.4rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.045em",
        }}
      >
        What do you want
        <br />
        to calculate?
      </h2>

      <p
        style={{
          marginTop: "16px",
          maxWidth: "580px",
          color: "#64748B",
          lineHeight: 1.7,
        }}
      >
        Type a calculation naturally. Calculam interprets
        your command and finds the answer.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid #CBD5E1",
          borderRadius: "18px",
          background: "#FFFFFF",
          boxShadow:
            "0 15px 40px rgba(15, 23, 42, 0.07)",
        }}
      >
        <Command
          size={20}
          style={{
            marginLeft: "12px",
            flexShrink: 0,
            color: "#94A3B8",
          }}
        />

        <input
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setResult(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              runCommand();
            }
          }}
          placeholder="Try “15% of 840”"
          aria-label="Calculation command"
          style={{
            minWidth: 0,
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#111827",
            fontSize: "1rem",
            padding: "12px 4px",
          }}
        />

        <button
          type="button"
          onClick={() => runCommand()}
          aria-label="Run calculation"
          style={{
            width: "46px",
            height: "46px",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            border: "none",
            borderRadius: "13px",
            background: "#4F46E5",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <ArrowRight size={19} />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "14px",
        }}
      >
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => {
              setInput(example);
              runCommand(example);
            }}
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "999px",
              padding: "8px 12px",
              background: "#FFFFFF",
              color: "#64748B",
              cursor: "pointer",
              fontSize: "0.78rem",
            }}
          >
            {example}
          </button>
        ))}
      </div>

      {result && (
        <div
          style={{
            marginTop: "22px",
            padding: "24px",
            borderRadius: "20px",
            border: "1px solid #E2E8F0",
            background: "#FFFFFF",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#94A3B8",
              fontSize: "0.82rem",
            }}
          >
            {result.explanation}
          </p>

          <p
            style={{
              margin: "8px 0 0",
              color:
                result.type === "unknown"
                  ? "#DC2626"
                  : "#111827",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 750,
              letterSpacing: "-0.04em",
            }}
          >
            {result.result}
          </p>
        </div>
      )}
    </section>
  );
}

export default CommandCenter;