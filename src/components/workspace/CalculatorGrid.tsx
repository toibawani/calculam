import {
  Calculator,
  Code2,
  FlaskConical,
  HeartPulse,
  Landmark,
  Ruler,
  Sigma,
  Zap,
} from "lucide-react";

import CalculatorCard from "./CalculatorCard";

const calculators = [
  {
    title: "Basic",
    description: "Fast everyday arithmetic and calculations.",
    icon: Calculator,
    path: "/workspace/basic",
  },
  {
    title: "Scientific",
    description: "Advanced functions, trigonometry and logarithms.",
    icon: Sigma,
    path: "/workspace/scientific",
  },
  {
    title: "Programmer",
    description: "Binary, hexadecimal, octal and bitwise operations.",
    icon: Code2,
    path: "/workspace/programmer",
  },
  {
    title: "Statistics",
    description: "Mean, median, variance, probability and more.",
    icon: Sigma,
    path: "/workspace/statistics",
  },
  {
    title: "Finance",
    description: "Loans, EMI, interest and investment calculations.",
    icon: Landmark,
    path: "/workspace/finance",
  },
  {
    title: "Physics",
    description: "Useful formulas for mechanics, electricity and waves.",
    icon: Zap,
    path: "/workspace/physics",
  },
  {
    title: "Chemistry",
    description: "Molar mass, concentration and chemical calculations.",
    icon: FlaskConical,
    path: "/workspace/chemistry",
  },
  {
    title: "Health",
    description: "Everyday health and body-related calculations.",
    icon: HeartPulse,
    path: "/workspace/health",
  },
  {
    title: "Unit Converter",
    description: "Convert length, mass, temperature and more.",
    icon: Ruler,
    path: "/workspace/converter",
  },
];

function CalculatorGrid() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "18px",
      }}
    >
      {calculators.map((calculator) => (
        <CalculatorCard
          key={calculator.title}
          title={calculator.title}
          description={calculator.description}
          icon={calculator.icon}
          path={calculator.path}
        />
      ))}
    </section>
  );
}

export default CalculatorGrid;