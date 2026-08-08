import { Clock3, Copy, Trash2 } from "lucide-react";
import type { CalculationHistoryItem } from "./historyTypes";

type HistoryPanelProps = {
  history: CalculationHistoryItem[];
  onSelect: (expression: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

function HistoryPanel({
  history,
  onSelect,
  onRemove,
  onClear,
}: HistoryPanelProps) {
  return (
    <section
      style={{
        width: "100%",
        maxWidth: "440px",
        border: "1px solid #E2E8F0",
        borderRadius: "24px",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
          }}
        >
          <Clock3 size={17} color="#4F46E5" />

          <h2
            style={{
              margin: 0,
              fontSize: "0.95rem",
              color: "#111827",
            }}
          >
            History
          </h2>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            style={{
              border: "none",
              background: "transparent",
              color: "#64748B",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            Clear
          </button>
        )}
      </header>

      <div
        style={{
          maxHeight: "430px",
          overflowY: "auto",
        }}
      >
        {history.length === 0 ? (
          <div
            style={{
              padding: "44px 20px",
              textAlign: "center",
              color: "#94A3B8",
            }}
          >
            <Clock3
              size={24}
              style={{ marginBottom: "10px" }}
            />

            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
              }}
            >
              Your calculations will appear here.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <article
              key={item.id}
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelect(item.expression)}
                  style={{
                    flex: 1,
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      color: "#64748B",
                      fontSize: "0.82rem",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.expression}
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      color: "#111827",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.result}
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      color: "#94A3B8",
                      fontSize: "0.7rem",
                    }}
                  >
                    {formatTime(item.timestamp)}
                  </div>
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <button
                    type="button"
                    aria-label="Reuse calculation"
                    onClick={() => onSelect(item.expression)}
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "grid",
                      placeItems: "center",
                      border: "none",
                      borderRadius: "9px",
                      background: "#F8FAFC",
                      color: "#64748B",
                      cursor: "pointer",
                    }}
                  >
                    <Copy size={15} />
                  </button>

                  <button
                    type="button"
                    aria-label="Remove calculation"
                    onClick={() => onRemove(item.id)}
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "grid",
                      placeItems: "center",
                      border: "none",
                      borderRadius: "9px",
                      background: "#F8FAFC",
                      color: "#64748B",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default HistoryPanel;