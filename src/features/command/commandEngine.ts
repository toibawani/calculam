import {
  calculate,
  formatResult,
} from "../calculator/calculatorEngine";

export type CommandResult = {
  result: string;
  explanation: string;
  type:
    | "arithmetic"
    | "percentage"
    | "square-root"
    | "conversion"
    | "unknown";
};

function cleanInput(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/,/g, "");
}

function percentageCommand(input: string): CommandResult | null {
  const match = input.match(
    /^(\d+(?:\.\d+)?)\s*%\s*(?:of)\s*(\d+(?:\.\d+)?)$/,
  );

  if (!match) {
    return null;
  }

  const percentage = Number(match[1]);
  const amount = Number(match[2]);
  const result = (percentage / 100) * amount;

  return {
    result: formatResult(result),
    explanation: `${percentage}% of ${amount}`,
    type: "percentage",
  };
}

function squareRootCommand(input: string): CommandResult | null {
  const match = input.match(
    /^(?:sqrt|square root of?)\s*(\d+(?:\.\d+)?)$/,
  );

  if (!match) {
    return null;
  }

  const value = Number(match[1]);

  if (value < 0) {
    return {
      result: "Invalid",
      explanation: "A real square root cannot be calculated for a negative number.",
      type: "square-root",
    };
  }

  return {
    result: formatResult(Math.sqrt(value)),
    explanation: `√${value}`,
    type: "square-root",
  };
}

function arithmeticCommand(input: string): CommandResult | null {
  const normalized = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/");

  if (!/^[0-9+\-*/().\s]+$/.test(normalized)) {
    return null;
  }

  const calculation = calculate(normalized);

  if (calculation.error || calculation.value === null) {
    return null;
  }

  return {
    result: formatResult(calculation.value),
    explanation: input,
    type: "arithmetic",
  };
}

export function executeCommand(
  rawInput: string,
): CommandResult {
  const input = cleanInput(rawInput);

  if (!input) {
    return {
      result: "",
      explanation: "",
      type: "unknown",
    };
  }

  const percentage = percentageCommand(input);

  if (percentage) {
    return percentage;
  }

  const squareRoot = squareRootCommand(input);

  if (squareRoot) {
    return squareRoot;
  }

  const arithmetic = arithmeticCommand(input);

  if (arithmetic) {
    return arithmetic;
  }

  return {
    result: "I don't understand that yet.",
    explanation:
      "Try an arithmetic expression, percentage, or square root.",
    type: "unknown",
  };
}