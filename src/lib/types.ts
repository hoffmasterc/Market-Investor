export type PropertyType = "single_family" | "duplex_triplex" | "small_multifamily";

export interface PropertyDetails {
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: PropertyType;
  currentFeatures: string[];
}

export interface UpgradeOpportunity {
  feature: string;
  estimatedCost: [number, number];
  estimatedRentLift: [number, number];
  roiPercent: number;
  priority: "high" | "medium" | "low";
}

export interface AnalysisResult {
  id: string;
  property: PropertyDetails;
  overallGrade: string;
  gradeScore: number;
  topUpgrades: UpgradeOpportunity[];
  hiddenValueFeatures: string[];
  neighborhoodComparison: {
    feature: string;
    marketPenetration: number;
    propertyHas: boolean;
  }[];
  overImprovementWarnings: string[];
  investorTip: string;
  estimatedTotalRentLift: [number, number];
  analyzedAt: string;
}

export const INTERIOR_FEATURES = [
  "In-unit Laundry",
  "Dishwasher",
  "Central AC",
  "Updated Kitchen",
  "Updated Bathroom",
] as const;

export const EXTERIOR_FEATURES = [
  "Off-street Parking",
  "Garage",
  "Yard",
  "Balcony or Patio",
] as const;

export const PROPERTY_FEATURES = [
  ...INTERIOR_FEATURES,
  ...EXTERIOR_FEATURES,
] as const;

export type PropertyFeature = (typeof PROPERTY_FEATURES)[number];
