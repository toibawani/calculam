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
    <section className="history-panel">
      <header className="history-header">
        <div className="history-header-content">
          <Clock3 size={17} color="var(--accent)" />

          <h2>History</h2>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
          >
            Clear
          </button>
        )}
      </header>

      <div className="history-content">
        {history.length === 0 ? (
          <div className="history-empty">
            <Clock3 size={24} />

            <p>Your calculations will appear here.</p>
          </div>
        ) : (
          history.map((item) => (
            <article
              key={item.id}
              className="history-item"
            >
              <div className="history-item-content">
                <button
                  type="button"
                  className="history-item-main"
                  onClick={() => onSelect(item.expression)}
                >
                  <div className="history-expression">
                    {item.expression}
                  </div>

                  <div className="history-result">
                    {item.result}
                  </div>

                  <div className="history-timestamp">
                    {formatTime(item.timestamp)}
                  </div>
                </button>

                <div className="history-actions">
                  <button
                    type="button"
                    className="history-action-button"
                    aria-label="Reuse calculation"
                    onClick={() => onSelect(item.expression)}
                  >
                    <Copy size={15} />
                  </button>

                  <button
                    type="button"
                    className="history-action-button"
                    aria-label="Remove calculation"
                    onClick={() => onRemove(item.id)}
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