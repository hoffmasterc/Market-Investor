import {
  PropertyDetails,
  AnalysisResult,
  UpgradeOpportunity,
  PROPERTY_FEATURES,
} from "@/lib/types";
import { getMarketSignals, adjustRentForProperty } from "@/lib/marketData";

// Cost estimates per feature upgrade
const UPGRADE_COSTS: Record<string, [number, number]> = {
  "Central AC": [3500, 7000],
  "In-unit Washer/Dryer": [1500, 3000],
  Dishwasher: [400, 900],
  "Hardwood Floors": [3000, 8000],
  "Granite/Quartz Countertops": [2000, 5000],
  "Stainless Steel Appliances": [2500, 5500],
  "Updated Bathroom": [3000, 10000],
  "Walk-in Closet": [1500, 4000],
  "Garage Parking": [8000, 20000],
  "Patio/Balcony": [2000, 8000],
  "Smart Home Features": [300, 1200],
  "Pet Friendly (fenced yard)": [1500, 4000],
  "Energy Efficient Windows": [3000, 8000],
  "Ceiling Fans": [150, 500],
  "Fresh Paint/Modern Colors": [500, 2000],
  "Updated Lighting Fixtures": [200, 800],
};

// Rent lift as % of median rent per feature
const RENT_LIFT_PERCENT: Record<string, [number, number]> = {
  "Central AC": [0.04, 0.08],
  "In-unit Washer/Dryer": [0.05, 0.1],
  Dishwasher: [0.02, 0.04],
  "Hardwood Floors": [0.03, 0.06],
  "Granite/Quartz Countertops": [0.03, 0.06],
  "Stainless Steel Appliances": [0.02, 0.05],
  "Updated Bathroom": [0.04, 0.08],
  "Walk-in Closet": [0.02, 0.04],
  "Garage Parking": [0.05, 0.1],
  "Patio/Balcony": [0.02, 0.05],
  "Smart Home Features": [0.01, 0.03],
  "Pet Friendly (fenced yard)": [0.03, 0.07],
  "Energy Efficient Windows": [0.02, 0.04],
  "Ceiling Fans": [0.01, 0.02],
  "Fresh Paint/Modern Colors": [0.02, 0.04],
  "Updated Lighting Fixtures": [0.01, 0.02],
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function analyzeProperty(property: PropertyDetails): AnalysisResult {
  const market = getMarketSignals(property.zipCode);
  const adjustedRent = adjustRentForProperty(
    market.medianRent,
    property.bedrooms,
    property.propertyType
  );

  const missingFeatures = PROPERTY_FEATURES.filter(
    (f) => !property.currentFeatures.includes(f)
  );

  // Calculate upgrade opportunities for missing features
  const upgrades: UpgradeOpportunity[] = missingFeatures.map((feature) => {
    const cost = UPGRADE_COSTS[feature] ?? [1000, 3000];
    const liftPct = RENT_LIFT_PERCENT[feature] ?? [0.02, 0.04];
    const penetration = market.avgFeaturePenetration[feature] ?? 0.3;

    // Higher penetration = market expects it, so more value from adding it
    const demandMultiplier =
      market.demandLevel === "high"
        ? 1.2
        : market.demandLevel === "moderate"
          ? 1.0
          : 0.8;

    const rentLiftLow = Math.round(
      adjustedRent * liftPct[0] * demandMultiplier
    );
    const rentLiftHigh = Math.round(
      adjustedRent * liftPct[1] * demandMultiplier
    );
    const avgLift = (rentLiftLow + rentLiftHigh) / 2;
    const avgCost = (cost[0] + cost[1]) / 2;
    const annualLift = avgLift * 12;
    const roi = Math.round((annualLift / avgCost) * 100);

    let priority: "high" | "medium" | "low" = "low";
    if (roi >= 40 && penetration >= 0.4) priority = "high";
    else if (roi >= 20 || penetration >= 0.5) priority = "medium";

    return {
      feature,
      estimatedCost: cost,
      estimatedRentLift: [rentLiftLow, rentLiftHigh],
      roiPercent: roi,
      priority,
    };
  });

  upgrades.sort((a, b) => b.roiPercent - a.roiPercent);

  // Hidden value: features the property has that are rare in the market
  const hiddenValueFeatures = property.currentFeatures.filter((f) => {
    const penetration = market.avgFeaturePenetration[f] ?? 0.3;
    return penetration < 0.25;
  });

  // Neighborhood comparison
  const neighborhoodComparison = PROPERTY_FEATURES.map((feature) => ({
    feature,
    marketPenetration: Math.round(
      (market.avgFeaturePenetration[feature] ?? 0.3) * 100
    ),
    propertyHas: property.currentFeatures.includes(feature),
  }));

  // Over-improvement warnings
  const overImprovementWarnings: string[] = [];
  for (const feature of property.currentFeatures) {
    const penetration = market.avgFeaturePenetration[feature] ?? 0.3;
    if (penetration < 0.15) {
      overImprovementWarnings.push(
        `"${feature}" is uncommon in this area (${Math.round(penetration * 100)}% of rentals). It may not increase rent proportionally.`
      );
    }
  }

  // Grade calculation
  const topUpgrades = upgrades.slice(0, 5);
  const avgTopROI =
    topUpgrades.length > 0
      ? topUpgrades.reduce((s, u) => s + u.roiPercent, 0) / topUpgrades.length
      : 0;

  let gradeScore: number;
  let overallGrade: string;
  if (avgTopROI >= 60) {
    gradeScore = 95;
    overallGrade = "A+";
  } else if (avgTopROI >= 45) {
    gradeScore = 88;
    overallGrade = "A";
  } else if (avgTopROI >= 35) {
    gradeScore = 82;
    overallGrade = "B+";
  } else if (avgTopROI >= 25) {
    gradeScore = 75;
    overallGrade = "B";
  } else if (avgTopROI >= 18) {
    gradeScore = 68;
    overallGrade = "C+";
  } else if (avgTopROI >= 12) {
    gradeScore = 60;
    overallGrade = "C";
  } else {
    gradeScore = 50;
    overallGrade = "D";
  }

  const totalLiftLow = topUpgrades.reduce(
    (s, u) => s + u.estimatedRentLift[0],
    0
  );
  const totalLiftHigh = topUpgrades.reduce(
    (s, u) => s + u.estimatedRentLift[1],
    0
  );

  return {
    id: generateId(),
    property,
    overallGrade,
    gradeScore,
    topUpgrades,
    hiddenValueFeatures,
    neighborhoodComparison,
    overImprovementWarnings,
    estimatedTotalRentLift: [totalLiftLow, totalLiftHigh],
    analyzedAt: new Date().toISOString(),
  };
}
