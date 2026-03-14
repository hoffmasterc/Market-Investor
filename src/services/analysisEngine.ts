import {
  PropertyDetails,
  AnalysisResult,
  UpgradeOpportunity,
  PROPERTY_FEATURES,
} from "@/lib/types";
import { getMarketSignals, adjustRentForProperty } from "@/lib/marketData";

// Cost estimates per feature upgrade
const UPGRADE_COSTS: Record<string, [number, number]> = {
  "In-unit Laundry": [1500, 3000],
  Dishwasher: [400, 900],
  "Central AC": [3500, 7000],
  "Updated Kitchen": [5000, 15000],
  "Updated Bathroom": [3000, 10000],
  "Off-street Parking": [2000, 6000],
  Garage: [8000, 20000],
  Yard: [1500, 5000],
  "Balcony or Patio": [2000, 8000],
};

// Rent lift as % of median rent per feature
const RENT_LIFT_PERCENT: Record<string, [number, number]> = {
  "In-unit Laundry": [0.05, 0.1],
  Dishwasher: [0.02, 0.04],
  "Central AC": [0.04, 0.08],
  "Updated Kitchen": [0.05, 0.1],
  "Updated Bathroom": [0.04, 0.08],
  "Off-street Parking": [0.03, 0.06],
  Garage: [0.05, 0.1],
  Yard: [0.03, 0.07],
  "Balcony or Patio": [0.02, 0.05],
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

  // Generate contextual investor tip
  const investorTip = generateInvestorTip(
    topUpgrades,
    hiddenValueFeatures,
    overImprovementWarnings,
    market.demandLevel,
    property.currentFeatures.length,
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
    investorTip,
    estimatedTotalRentLift: [totalLiftLow, totalLiftHigh],
    analyzedAt: new Date().toISOString(),
  };
}

function generateInvestorTip(
  topUpgrades: UpgradeOpportunity[],
  hiddenValue: string[],
  warnings: string[],
  demandLevel: string,
  featureCount: number,
): string {
  if (featureCount === 0 && topUpgrades.length > 0) {
    const best = topUpgrades[0];
    return `Start with "${best.feature}" — it has the highest ROI in this market and is a low-risk first upgrade.`;
  }

  if (warnings.length >= 2) {
    return "This property may already be over-improved for its market. Focus on marketing existing features rather than adding new ones.";
  }

  if (hiddenValue.length >= 2) {
    return `This property has ${hiddenValue.length} features that are rare in the neighborhood. Highlight these in listings to justify above-market rent.`;
  }

  const highPriority = topUpgrades.filter((u) => u.priority === "high");
  if (highPriority.length >= 2) {
    return `There are ${highPriority.length} high-ROI upgrades available. Consider bundling them together to maximize rent lift while sharing contractor mobilization costs.`;
  }

  if (demandLevel === "high" && topUpgrades.length > 0) {
    return "Rental demand is strong in this area. Even modest upgrades can command premium rents — act while the market favors landlords.";
  }

  if (topUpgrades.length > 0) {
    const cheapest = [...topUpgrades].sort(
      (a, b) => a.estimatedCost[0] - b.estimatedCost[0]
    )[0];
    return `For the best quick win, consider "${cheapest.feature}" — it has one of the lowest costs and still delivers meaningful rent lift.`;
  }

  return "This property is well-equipped for its market. Maintain current features and revisit upgrades when neighborhood trends shift.";
}
