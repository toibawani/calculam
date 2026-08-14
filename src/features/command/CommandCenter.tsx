import { useMemo, useState } from "react";

type CommandCenterProps = {
  onCalculation?: (expression: string, result: string) => void;
};

function evaluateCommand(input: string): number {
  const command = input.trim().toLowerCase();

  if (!command) {
    return NaN;
  }

  const percentageMatch = command.match(
    /^(-?\d+(?:\.\d+)?)%\s+of\s+(-?\d+(?:\.\d+)?)$/,
  );

  if (percentageMatch) {
    const percentage = Number(percentageMatch[1]);
    const value = Number(percentageMatch[2]);

    return (percentage / 100) * value;
  }

  const sqrtMatch = command.match(
    /^sqrt\s+(-?\d+(?:\.\d+)?)$/,
  );

  if (sqrtMatch) {
    return Math.sqrt(Number(sqrtMatch[1]));
  }

  const arithmeticMatch = command.match(
    /^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/,
  );

  if (arithmeticMatch) {
    const first = Number(arithmeticMatch[1]);
    const operator = arithmeticMatch[2];
    const second = Number(arithmeticMatch[3]);

    switch (operator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return second === 0 ? NaN : first / second;
    }
  }

  return NaN;
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

  const result = useMemo(() => {
    return evaluateCommand(command);
  }, [command]);

  const formattedResult = formatResult(result);

  const handleCalculate = () => {
    if (!Number.isFinite(result)) {
      return;
    }

    onCalculation?.(
      command.trim(),
      String(result),
    );
  };

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
          {formattedResult}
        </span>
      </div>

      <div className="command-input-row">
        <input
          type="text"
          value={command}
          placeholder="Try 15% of 840"
          onChange={(event) =>
            setCommand(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleCalculate();
            }
          }}
        />

        <button
          type="button"
          onClick={handleCalculate}
          disabled={!Number.isFinite(result)}
        >
          Calculate
        </button>
      </div>

      <div className="command-examples">
        <button
          type="button"
          onClick={() => setCommand("15% of 840")}
        >
          15% of 840
        </button>

        <button
          type="button"
          onClick={() => setCommand("sqrt 144")}
        >
          sqrt 144
        </button>

        <button
          type="button"
          onClick={() => setCommand("25 * 18")}
        >
          25 * 18
        </button>
      </div>
    </section>
  );
}