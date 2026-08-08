import { Delete } from "lucide-react";

type CalculatorKeypadProps = {
  onInput: (value: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onCalculate: () => void;
};

const keys = [
  { label: "AC", value: "clear", type: "utility" },
  { label: "(", value: "(", type: "utility" },
  { label: ")", value: ")", type: "utility" },
  { label: "÷", value: "/", type: "operator" },

  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "×", value: "*", type: "operator" },

  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "−", value: "-", type: "operator" },

  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },
  { label: "+", value: "+", type: "operator" },

  { label: "0", value: "0", type: "number" },
  { label: ".", value: ".", type: "number" },
  { label: "⌫", value: "delete", type: "utility" },
  { label: "=", value: "=", type: "equals" },
];

function CalculatorKeypad({
  onInput,
  onClear,
  onDelete,
  onCalculate,
}: CalculatorKeypadProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        marginTop: "14px",
      }}
    >
      {keys.map((key) => {
        const isEquals = key.type === "equals";
        const isOperator = key.type === "operator";
        const isUtility = key.type === "utility";

        return (
          <button
            key={key.label}
            type="button"
            aria-label={
              key.value === "delete" ? "Delete last character" : key.label
            }
            onClick={() => {
              if (key.value === "clear") {
                onClear();
              } else if (key.value === "delete") {
                onDelete();
              } else if (key.value === "=") {
                onCalculate();
              } else {
                onInput(key.value);
              }
            }}
            style={{
              minHeight: "62px",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              background: isEquals
                ? "#4F46E5"
                : isOperator
                  ? "#EEF2FF"
                  : isUtility
                    ? "#F1F5F9"
                    : "#FFFFFF",
              color: isEquals
                ? "#FFFFFF"
                : isOperator
                  ? "#4338CA"
                  : "#1E293B",
              fontSize: "1.05rem",
              fontWeight: 650,
              cursor: "pointer",
            }}
          >
            {key.value === "delete" ? <Delete size={19} /> : key.label}
          </button>
        );
      })}
    </div>
  );
}

export default CalculatorKeypad;