export type UnitCategory =
  | "length"
  | "weight"
  | "temperature"
  | "time";

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

export function formatConvertedValue(
  value: number,
): string {
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