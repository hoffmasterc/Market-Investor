export type PropertyType = "single_family" | "condo" | "townhouse" | "multi_family";

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
  estimatedTotalRentLift: [number, number];
  analyzedAt: string;
}

export const PROPERTY_FEATURES = [
  "Central AC",
  "In-unit Washer/Dryer",
  "Dishwasher",
  "Hardwood Floors",
  "Granite/Quartz Countertops",
  "Stainless Steel Appliances",
  "Updated Bathroom",
  "Walk-in Closet",
  "Garage Parking",
  "Patio/Balcony",
  "Smart Home Features",
  "Pet Friendly (fenced yard)",
  "Energy Efficient Windows",
  "Ceiling Fans",
  "Fresh Paint/Modern Colors",
  "Updated Lighting Fixtures",
] as const;

export type PropertyFeature = (typeof PROPERTY_FEATURES)[number];
