import {
  Calculator,
  Command,
  History,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Calculator",
    description: "Fast everyday calculations with a clean interface.",
  },
  {
    icon: Sparkles,
    title: "Scientific",
    description: "Advanced functions for mathematics and engineering.",
  },
  {
    icon: ArrowRight,
    title: "Converter",
    description: "Convert units, temperatures, time, weight and more.",
  },
  {
    icon: History,
    title: "History",
    description: "Keep track of your previous calculations.",
  },
];

export default function Workspace() {
  return (
    <main className="workspace-page">
      <section className="workspace-header">
        <div>
          <span className="workspace-eyebrow">
            <Sparkles size={15} />
            CALCULAM WORKSPACE
          </span>

          <h1>
            Your calculations,
            <br />
            <span>all in one place.</span>
          </h1>

          <p>
            A focused calculation environment designed for speed,
            clarity and everyday problem solving.
          </p>
        </div>

        <button className="command-button">
          <Command size={17} />
          Command Center
          <kbd>⌘ K</kbd>
        </button>
      </section>

      <section className="workspace-grid">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <button className="workspace-card" key={tool.title}>
              <div className="workspace-card-icon">
                <Icon size={22} />
              </div>

              <div className="workspace-card-content">
                <h2>{tool.title}</h2>
                <p>{tool.description}</p>
              </div>

              <ArrowRight
                className="workspace-card-arrow"
                size={18}
              />
            </button>
          );
        })}
      </section>
    </main>
  );
}
