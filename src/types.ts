export interface ArchitectureTier {
  id: string;
  number: string;
  name: string;
  depth: string;
  temperature: string;
  shortDesc: string;
  detailedSpecs: string[];
  principles: string[];
  tag: string;
  accentColor: string;
  waterFlowRate: string;
}

export interface RubricCategory {
  title: string;
  weight: number;
  percentage: string;
  scoreGrade: string;
  description: string;
  keyDeliverables: string[];
  color: string;
}

export interface CalculatorState {
  residents: number;
  apartments: number;
  rainfallMm: number;
  catchmentAreaSqM: number;
  avgTankerPrice: number;
}
