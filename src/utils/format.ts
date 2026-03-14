export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRange(low: number, high: number): string {
  return `${formatCurrency(low)} – ${formatCurrency(high)}`;
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function gradeColor(grade: string): string {
  if (grade.startsWith("A")) return "text-green-400";
  if (grade.startsWith("B")) return "text-blue-400";
  if (grade.startsWith("C")) return "text-yellow-400";
  return "text-red-400";
}

export function gradeBgColor(grade: string): string {
  if (grade.startsWith("A")) return "bg-green-500/20 border-green-500/30";
  if (grade.startsWith("B")) return "bg-blue-500/20 border-blue-500/30";
  if (grade.startsWith("C")) return "bg-yellow-500/20 border-yellow-500/30";
  return "bg-red-500/20 border-red-500/30";
}
