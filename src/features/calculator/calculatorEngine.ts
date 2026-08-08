export type CalculationResult = {
  value: number | null;
  error: string | null;
};

const operators = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
} as const;

type Operator = keyof typeof operators;

function tokenize(expression: string): string[] {
  const normalized = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, "");

  const tokens: string[] = [];
  let number = "";

  for (let index = 0; index < normalized.length; index += 1) {
    const character = normalized[index];

    if (
      /[0-9.]/.test(character) ||
      (character === "-" &&
        (index === 0 || ["+", "-", "*", "/", "("].includes(normalized[index - 1])))
    ) {
      number += character;
      continue;
    }

    if (number) {
      tokens.push(number);
      number = "";
    }

    if (["+", "-", "*", "/", "(", ")"].includes(character)) {
      tokens.push(character);
      continue;
    }

    return [];
  }

  if (number) {
    tokens.push(number);
  }

  return tokens;
}

function toPostfix(tokens: string[]): string[] | null {
  const output: string[] = [];
  const stack: string[] = [];

  for (const token of tokens) {
    if (!Number.isNaN(Number(token))) {
      output.push(token);
      continue;
    }

    if (token === "(") {
      stack.push(token);
      continue;
    }

    if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop()!);
      }

      if (stack.pop() !== "(") {
        return null;
      }

      continue;
    }

    if (token in operators) {
      const operator = token as Operator;

      while (
        stack.length &&
        stack[stack.length - 1] in operators &&
        operators[stack[stack.length - 1] as Operator] >= operators[operator]
      ) {
        output.push(stack.pop()!);
      }

      stack.push(operator);
      continue;
    }

    return null;
  }

  while (stack.length) {
    const operator = stack.pop()!;

    if (operator === "(") {
      return null;
    }

    output.push(operator);
  }

  return output;
}

function evaluatePostfix(tokens: string[]): number | null {
  const stack: number[] = [];

  for (const token of tokens) {
    if (!Number.isNaN(Number(token))) {
      stack.push(Number(token));
      continue;
    }

    const right = stack.pop();
    const left = stack.pop();

    if (left === undefined || right === undefined) {
      return null;
    }

    switch (token) {
      case "+":
        stack.push(left + right);
        break;

      case "-":
        stack.push(left - right);
        break;

      case "*":
        stack.push(left * right);
        break;

      case "/":
        if (right === 0) {
          return null;
        }

        stack.push(left / right);
        break;

      default:
        return null;
    }
  }

  return stack.length === 1 ? stack[0] : null;
}

export function calculate(expression: string): CalculationResult {
  if (!expression.trim()) {
    return {
      value: null,
      error: null,
    };
  }

  const tokens = tokenize(expression);

  if (!tokens.length) {
    return {
      value: null,
      error: "Invalid expression",
    };
  }

  const postfix = toPostfix(tokens);

  if (!postfix) {
    return {
      value: null,
      error: "Invalid expression",
    };
  }

  const result = evaluatePostfix(postfix);

  if (result === null || !Number.isFinite(result)) {
    return {
      value: null,
      error: "Unable to calculate",
    };
  }

  return {
    value: result,
    error: null,
  };
}

export function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 12,
  }).format(value);
}