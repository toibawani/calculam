import { useMemo, useState } from "react";

export type UnitCategory =
  | "length"
  | "weight"
  | "temperature"
  | "time"
  | "area"
  | "volume";

type UnitDefinition = {
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

type UnitGroup = Record<string, UnitDefinition>;

export const units: Record<UnitCategory, UnitGroup> = {
  length: {
    meter: {
      label: "Meter",
      toBase: (value) => value,
      fromBase: (value) => value,
    },
    kilometer: {
      label: "Kilometer",
      toBase: (value) => value * 1000,
      fromBase: (value) => value / 1000,
    },
    centimeter: {
      label: "Centimeter",
      toBase: (value) => value / 100,
      fromBase: (value) => value * 100,
    },
    millimeter: {
      label: "Millimeter",
      toBase: (value) => value / 1000,
      fromBase: (value) => value * 1000,
    },
    mile: {
      label: "Mile",
      toBase: (value) => value * 1609.344,
      fromBase: (value) => value / 1609.344,
    },
    foot: {
      label: "Foot",
      toBase: (value) => value * 0.3048,
      fromBase: (value) => value / 0.3048,
    },
    inch: {
      label: "Inch",
      toBase: (value) => value * 0.0254,
      fromBase: (value) => value / 0.0254,
    },
  },

  weight: {
    kilogram: {
      label: "Kilogram",
      toBase: (value) => value,
      fromBase: (value) => value,
    },
    gram: {
      label: "Gram",
      toBase: (value) => value / 1000,
      fromBase: (value) => value * 1000,
    },
    milligram: {
      label: "Milligram",
      toBase: (value) => value / 1_000_000,
      fromBase: (value) => value * 1_000_000,
    },
    pound: {
      label: "Pound",
      toBase: (value) => value * 0.45359237,
      fromBase: (value) => value / 0.45359237,
    },
    ounce: {
      label: "Ounce",
      toBase: (value) => value * 0.028349523125,
      fromBase: (value) => value / 0.028349523125,
    },
  },

  temperature: {
    celsius: {
      label: "Celsius",
      toBase: (value) => value,
      fromBase: (value) => value,
    },
    fahrenheit: {
      label: "Fahrenheit",
      toBase: (value) => (value - 32) * (5 / 9),
      fromBase: (value) => value * (9 / 5) + 32,
    },
    kelvin: {
      label: "Kelvin",
      toBase: (value) => value - 273.15,
      fromBase: (value) => value + 273.15,
    },
  },

  time: {
    second: {
      label: "Second",
      toBase: (value) => value,
      fromBase: (value) => value,
    },
    minute: {
      label: "Minute",
      toBase: (value) => value * 60,
      fromBase: (value) => value / 60,
    },
    hour: {
      label: "Hour",
      toBase: (value) => value * 3600,
      fromBase: (value) => value / 3600,
    },
    day: {
      label: "Day",
      toBase: (value) => value * 86400,
      fromBase: (value) => value / 86400,
    },
  },

  area: {
    squareMeter: {
      label: "Square Meter",
      toBase: (value) => value,
      fromBase: (value) => value,
    },
    squareKilometer: {
      label: "Square Kilometer",
      toBase: (value) => value * 1_000_000,
      fromBase: (value) => value / 1_000_000,
    },
    squareCentimeter: {
      label: "Square Centimeter",
      toBase: (value) => value / 10_000,
      fromBase: (value) => value * 10_000,
    },
    squareMillimeter: {
      label: "Square Millimeter",
      toBase: (value) => value / 1_000_000,
      fromBase: (value) => value * 1_000_000,
    },
    squareFoot: {
      label: "Square Foot",
      toBase: (value) => value * 0.09290304,
      fromBase: (value) => value / 0.09290304,
    },
    squareInch: {
      label: "Square Inch",
      toBase: (value) => value * 0.00064516,
      fromBase: (value) => value / 0.00064516,
    },
    acre: {
      label: "Acre",
      toBase: (value) => value * 4046.8564224,
      fromBase: (value) => value / 4046.8564224,
    },
    hectare: {
      label: "Hectare",
      toBase: (value) => value * 10_000,
      fromBase: (value) => value / 10_000,
    },
  },

  volume: {
    liter: {
      label: "Liter",
      toBase: (value) => value,
      fromBase: (value) => value,
    },
    milliliter: {
      label: "Milliliter",
      toBase: (value) => value / 1000,
      fromBase: (value) => value * 1000,
    },
    cubicMeter: {
      label: "Cubic Meter",
      toBase: (value) => value * 1000,
      fromBase: (value) => value / 1000,
    },
    cubicCentimeter: {
      label: "Cubic Centimeter",
      toBase: (value) => value / 1000,
      fromBase: (value) => value * 1000,
    },
    gallon: {
      label: "US Gallon",
      toBase: (value) => value * 3.785411784,
      fromBase: (value) => value / 3.785411784,
    },
    quart: {
      label: "US Quart",
      toBase: (value) => value * 0.946352946,
      fromBase: (value) => value / 0.946352946,
    },
    pint: {
      label: "US Pint",
      toBase: (value) => value * 0.473176473,
      fromBase: (value) => value / 0.473176473,
    },
    cup: {
      label: "US Cup",
      toBase: (value) => value * 0.2365882365,
      fromBase: (value) => value / 0.2365882365,
    },
  },
};

export function convertUnit(
  value: number,
  category: UnitCategory,
  from: string,
  to: string,
): number {
  const categoryUnits = units[category];

  const fromUnit = categoryUnits[from];
  const toUnit = categoryUnits[to];

  if (!fromUnit || !toUnit) {
    return NaN;
  }

  const baseValue = fromUnit.toBase(value);

  return toUnit.fromBase(baseValue);
}

export function formatConvertedValue(value: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(4);
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
  }).format(value);
}

const categoryLabels: Record<UnitCategory, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  time: "Time",
  area: "Area",
  volume: "Volume",
};

export default function UnitConverter() {
  const [category, setCategory] =
    useState<UnitCategory>("length");

  const [from, setFrom] = useState("meter");
  const [to, setTo] = useState("kilometer");
  const [value, setValue] = useState("1");

  const unitNames = useMemo(
    () => Object.keys(units[category]),
    [category],
  );

  const result = useMemo(() => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return NaN;
    }

    return convertUnit(
      numericValue,
      category,
      from,
      to,
    );
  }, [value, category, from, to]);

  const formattedResult =
    formatConvertedValue(result);

  const handleCategoryChange = (
    nextCategory: UnitCategory,
  ) => {
    const nextUnits = Object.keys(
      units[nextCategory],
    );

    setCategory(nextCategory);
    setFrom(nextUnits[0]);
    setTo(nextUnits[1] ?? nextUnits[0]);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section className="converter-card">
      <div className="converter-header">
        <div>
          <span className="converter-eyebrow">
            UNIT CONVERTER
          </span>

          <h2>Convert anything.</h2>
        </div>

        <div className="converter-result">
          <span>Result</span>
          <strong>{formattedResult}</strong>
        </div>
      </div>

      <div className="converter-categories">
        {(
          Object.keys(categoryLabels) as UnitCategory[]
        ).map((item) => (
          <button
            key={item}
            type="button"
            className={
              category === item
                ? "converter-category active"
                : "converter-category"
            }
            onClick={() =>
              handleCategoryChange(item)
            }
          >
            {categoryLabels[item]}
          </button>
        ))}
      </div>

      <div className="converter-fields">
        <label className="converter-field">
          <span>From</span>

          <input
            type="number"
            value={value}
            onChange={(event) =>
              setValue(event.target.value)
            }
          />

          <select
            value={from}
            onChange={(event) =>
              setFrom(event.target.value)
            }
          >
            {unitNames.map((unit) => (
              <option
                key={unit}
                value={unit}
              >
                {units[category][unit].label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="converter-swap"
          onClick={handleSwap}
          aria-label="Swap units"
          title="Swap units"
        >
          ⇄
        </button>

        <label className="converter-field">
          <span>To</span>

          <div className="converter-output">
            {formattedResult}
          </div>

          <select
            value={to}
            onChange={(event) =>
              setTo(event.target.value)
            }
          >
            {unitNames.map((unit) => (
              <option
                key={unit}
                value={unit}
              >
                {units[category][unit].label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}