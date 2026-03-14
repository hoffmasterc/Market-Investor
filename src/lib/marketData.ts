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
      "Central AC": 0.65,
      "In-unit Washer/Dryer": 0.45,
      Dishwasher: 0.72,
      "Hardwood Floors": 0.68,
      "Granite/Quartz Countertops": 0.38,
      "Stainless Steel Appliances": 0.55,
      "Updated Bathroom": 0.35,
      "Walk-in Closet": 0.25,
      "Garage Parking": 0.12,
      "Patio/Balcony": 0.3,
      "Smart Home Features": 0.15,
      "Pet Friendly (fenced yard)": 0.1,
      "Energy Efficient Windows": 0.28,
      "Ceiling Fans": 0.4,
      "Fresh Paint/Modern Colors": 0.5,
      "Updated Lighting Fixtures": 0.32,
    },
    demandLevel: "high",
    rentGrowthYoY: 0.045,
  },
  "900": {
    medianRent: 2800,
    avgFeaturePenetration: {
      "Central AC": 0.82,
      "In-unit Washer/Dryer": 0.55,
      Dishwasher: 0.78,
      "Hardwood Floors": 0.42,
      "Granite/Quartz Countertops": 0.48,
      "Stainless Steel Appliances": 0.62,
      "Updated Bathroom": 0.4,
      "Walk-in Closet": 0.38,
      "Garage Parking": 0.45,
      "Patio/Balcony": 0.52,
      "Smart Home Features": 0.22,
      "Pet Friendly (fenced yard)": 0.25,
      "Energy Efficient Windows": 0.35,
      "Ceiling Fans": 0.55,
      "Fresh Paint/Modern Colors": 0.45,
      "Updated Lighting Fixtures": 0.38,
    },
    demandLevel: "high",
    rentGrowthYoY: 0.038,
  },
  "606": {
    medianRent: 2100,
    avgFeaturePenetration: {
      "Central AC": 0.72,
      "In-unit Washer/Dryer": 0.48,
      Dishwasher: 0.68,
      "Hardwood Floors": 0.55,
      "Granite/Quartz Countertops": 0.32,
      "Stainless Steel Appliances": 0.5,
      "Updated Bathroom": 0.3,
      "Walk-in Closet": 0.28,
      "Garage Parking": 0.35,
      "Patio/Balcony": 0.32,
      "Smart Home Features": 0.12,
      "Pet Friendly (fenced yard)": 0.2,
      "Energy Efficient Windows": 0.3,
      "Ceiling Fans": 0.42,
      "Fresh Paint/Modern Colors": 0.38,
      "Updated Lighting Fixtures": 0.28,
    },
    demandLevel: "moderate",
    rentGrowthYoY: 0.032,
  },
};

const DEFAULT_MARKET: MarketSignals = {
  medianRent: 1800,
  avgFeaturePenetration: {
    "Central AC": 0.6,
    "In-unit Washer/Dryer": 0.35,
    Dishwasher: 0.6,
    "Hardwood Floors": 0.4,
    "Granite/Quartz Countertops": 0.25,
    "Stainless Steel Appliances": 0.42,
    "Updated Bathroom": 0.28,
    "Walk-in Closet": 0.22,
    "Garage Parking": 0.3,
    "Patio/Balcony": 0.28,
    "Smart Home Features": 0.1,
    "Pet Friendly (fenced yard)": 0.18,
    "Energy Efficient Windows": 0.22,
    "Ceiling Fans": 0.35,
    "Fresh Paint/Modern Colors": 0.35,
    "Updated Lighting Fixtures": 0.25,
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
  townhouse: 1.0,
  condo: 0.9,
  multi_family: 0.85,
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
