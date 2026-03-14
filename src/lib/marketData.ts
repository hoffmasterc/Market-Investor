import { PropertyType } from "./types";

export interface MarketSignals {
  medianRent: number;
  avgFeaturePenetration: Record<string, number>;
  demandLevel: "low" | "moderate" | "high";
  rentGrowthYoY: number;
}

// Simulated market data keyed by ZIP prefix (first 3 digits)
const MARKET_DATA: Record<string, MarketSignals> = {
  "100": {
    medianRent: 3200,
    avgFeaturePenetration: {
      "In-unit Laundry": 0.45,
      Dishwasher: 0.72,
      "Central AC": 0.65,
      "Updated Kitchen": 0.38,
      "Updated Bathroom": 0.35,
      "Off-street Parking": 0.2,
      Garage: 0.12,
      Yard: 0.1,
      "Balcony or Patio": 0.3,
    },
    demandLevel: "high",
    rentGrowthYoY: 0.045,
  },
  "900": {
    medianRent: 2800,
    avgFeaturePenetration: {
      "In-unit Laundry": 0.55,
      Dishwasher: 0.78,
      "Central AC": 0.82,
      "Updated Kitchen": 0.48,
      "Updated Bathroom": 0.4,
      "Off-street Parking": 0.52,
      Garage: 0.45,
      Yard: 0.25,
      "Balcony or Patio": 0.52,
    },
    demandLevel: "high",
    rentGrowthYoY: 0.038,
  },
  "606": {
    medianRent: 2100,
    avgFeaturePenetration: {
      "In-unit Laundry": 0.48,
      Dishwasher: 0.68,
      "Central AC": 0.72,
      "Updated Kitchen": 0.32,
      "Updated Bathroom": 0.3,
      "Off-street Parking": 0.4,
      Garage: 0.35,
      Yard: 0.2,
      "Balcony or Patio": 0.32,
    },
    demandLevel: "moderate",
    rentGrowthYoY: 0.032,
  },
};

const DEFAULT_MARKET: MarketSignals = {
  medianRent: 1800,
  avgFeaturePenetration: {
    "In-unit Laundry": 0.35,
    Dishwasher: 0.6,
    "Central AC": 0.6,
    "Updated Kitchen": 0.25,
    "Updated Bathroom": 0.28,
    "Off-street Parking": 0.35,
    Garage: 0.3,
    Yard: 0.18,
    "Balcony or Patio": 0.28,
  },
  demandLevel: "moderate",
  rentGrowthYoY: 0.028,
};

const BEDROOM_MULTIPLIER: Record<number, number> = {
  1: 0.75,
  2: 0.9,
  3: 1.0,
  4: 1.15,
  5: 1.25,
};

const TYPE_MULTIPLIER: Record<PropertyType, number> = {
  single_family: 1.1,
  duplex_triplex: 0.95,
  small_multifamily: 0.85,
};

export function getMarketSignals(zipCode: string): MarketSignals {
  const prefix3 = zipCode.slice(0, 3);
  const base = MARKET_DATA[prefix3] ?? DEFAULT_MARKET;
  return base;
}

export function adjustRentForProperty(
  baseRent: number,
  bedrooms: number,
  propertyType: PropertyType
): number {
  const bedMult = BEDROOM_MULTIPLIER[bedrooms] ?? 1.0;
  const typeMult = TYPE_MULTIPLIER[propertyType] ?? 1.0;
  return Math.round(baseRent * bedMult * typeMult);
}
