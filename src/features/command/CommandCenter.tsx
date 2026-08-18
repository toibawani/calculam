import { useMemo, useState } from "react";

type CommandCenterProps = {
  onCalculation?: (expression: string, result: string) => void;
};

type Token =
  | { type: "number"; value: number }
  | {
      type: "operator";
      value: "+" | "-" | "*" | "/" | "^";
    }
  | { type: "leftParen" }
  | { type: "rightParen" };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  while (index < input.length) {
    const char = input[index];

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (/[0-9.]/.test(char)) {
      let number = "";

      while (
        index < input.length &&
        /[0-9.]/.test(input[index])
      ) {
        number += input[index];
        index += 1;
      }

      const value = Number(number);

      if (!Number.isFinite(value)) {
        return [];
      }

      tokens.push({
        type: "number",
        value,
      });

      continue;
    }

    if ("+-*/^".includes(char)) {
      tokens.push({
        type: "operator",
        value: char as "+" | "-" | "*" | "/" | "^",
      });

      index += 1;
      continue;
    }

    if (char === "(") {
      tokens.push({ type: "leftParen" });
      index += 1;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "rightParen" });
      index += 1;
      continue;
    }

    return [];
  }

  return tokens;
}

function precedence(operator: string): number {
  if (operator === "^") {
    return 3;
  }

  if (operator === "*" || operator === "/") {
    return 2;
  }

  return 1;
}

function applyOperator(
  operator: string,
  left: number,
  right: number,
): number {
  switch (operator) {
    case "+":
      return left + right;

    case "-":
      return left - right;

    case "*":
      return left * right;

    case "/":
      return right === 0 ? NaN : left / right;

    case "^":
      return Math.pow(left, right);

    default:
      return NaN;
  }
}

function evaluateArithmetic(input: string): number {
  const tokens = tokenize(input);

  if (tokens.length === 0) {
    return NaN;
  }

  const values: number[] = [];
  const operators: string[] = [];

  const applyTopOperator = () => {
    const operator = operators.pop();

    if (!operator) {
      return;
    }

    const right = values.pop();
    const left = values.pop();

    if (left === undefined || right === undefined) {
      values.push(NaN);
      return;
    }

    values.push(
      applyOperator(operator, left, right),
    );
  };

  for (const token of tokens) {
    if (token.type === "number") {
      values.push(token.value);
      continue;
    }

    if (token.type === "leftParen") {
      operators.push("(");
      continue;
    }

    if (token.type === "rightParen") {
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== "("
      ) {
        applyTopOperator();
      }

      if (
        operators.length === 0 ||
        operators.pop() !== "("
      ) {
        return NaN;
      }

      continue;
    }

    while (
      operators.length > 0 &&
      operators[operators.length - 1] !== "(" &&
      precedence(
        operators[operators.length - 1],
      ) >= precedence(token.value)
    ) {
      applyTopOperator();
    }

    operators.push(token.value);
  }

  while (operators.length > 0) {
    if (operators[operators.length - 1] === "(") {
      return NaN;
    }

    applyTopOperator();
  }

  if (values.length !== 1) {
    return NaN;
  }

  return values[0];
}

function evaluateCommand(input: string): number {
  const command = input.trim().toLowerCase();

  if (!command) {
    return NaN;
  }

  const percentageMatch = command.match(
    /^(-?\d+(?:\.\d+)?)\s*%\s*of\s*(-?\d+(?:\.\d+)?)$/,
  );

  if (percentageMatch) {
    const percentage = Number(percentageMatch[1]);
    const value = Number(percentageMatch[2]);

    return (percentage / 100) * value;
  }

  const sqrtMatch = command.match(
    /^(?:sqrt|square\s+root(?:\s+of)?)\s+(-?\d+(?:\.\d+)?)$/,
  );

  if (sqrtMatch) {
    const value = Number(sqrtMatch[1]);

    return value < 0 ? NaN : Math.sqrt(value);
  }

  return evaluateArithmetic(command);
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return "No result";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 10,
  }).format(value);
}

export default function CommandCenter({
  onCalculation,
}: CommandCenterProps) {
  const [command, setCommand] = useState("");

  const result = useMemo(
    () => evaluateCommand(command),
    [command],
  );

  const isValid = Number.isFinite(result);
  const hasInput = command.trim().length > 0;

  const statusText = !hasInput
    ? "Ready"
    : isValid
      ? "Valid command"
      : "Try another command";

  const handleCalculate = () => {
    const expression = command.trim();

    if (!expression || !isValid) {
      return;
    }

    onCalculation?.(
      expression,
      String(Number(result.toFixed(12))),
    );
  };

  const handleClear = () => {
    setCommand("");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleCalculate();
    }

    if (event.key === "Escape") {
      handleClear();
    }
  };

  const examples = [
    "25 + 18 * 2",
    "(25 + 18) * 2",
    "2 ^ 10",
    "15% of 840",
    "sqrt 144",
  ];

  return (
    <section className="command-card">
      <div className="command-header">
        <div>
          <span className="converter-eyebrow">
            COMMAND CENTER
          </span>

          <h2>Calculate naturally</h2>
        </div>

        <span className="converter-result-label">
          {formatResult(result)}
        </span>
      </div>

      <div className="command-input-row">
        <div
          style={{
            position: "relative",
            flex: 1,
          }}
        >
          <input
            type="text"
            value={command}
            placeholder="Try (25 + 18) * 2"
            aria-label="Calculation command"
            onChange={(event) =>
              setCommand(event.target.value)
            }
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              paddingRight: hasInput
                ? "42px"
                : undefined,
            }}
          />

          {hasInput && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear command"
              title="Clear command"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "28px",
                height: "28px",
                border: "none",
                borderRadius: "50%",
                background: "#F1F5F9",
                color: "#64748B",
                cursor: "pointer",
                fontSize: "16px",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          disabled={!isValid}
        >
          Calculate
        </button>
      </div>

      <div
        style={{
          marginTop: "8px",
          color: isValid
            ? "#64748B"
            : "#B45309",
          fontSize: "0.75rem",
        }}
        aria-live="polite"
      >
        {statusText}
      </div>

      <div className="command-examples">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setCommand(example)}
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}