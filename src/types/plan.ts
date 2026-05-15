export interface WeatherSummary {
  overallCondition: string;
  temperatureRange: string;
  bestDayToExplore: string;
  clothingSuggestion: string;
  weatherWarning: string;
}

export interface DailyWeather {
  date: string;
  temperature: string;
  condition: string;
  rainChance: string;
  travelAdvice: string;
}

export interface HiddenGem {
  name: string;
  category: string;
  whySpecial: string;
  bestTimeToVisit: string;
}

export interface PersonalizedRecommendation {
  place: string;
  category: string;
  reason: string;
}

export interface Activity {
  title: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  weatherCondition: string;
  morningActivity: Activity;
  afternoonActivity: Activity;
  eveningActivity: Activity;
  foodSpot: {
    name: string;
    speciality: string;
  };
  hiddenGem: {
    name: string;
    whyVisit: string;
  };
  estimatedCost: string;
  alternativeRainPlan: string;
}

export interface StayOption {
  name: string;
  priceRange: string;
  whyRecommended: string;
}

export interface ClimateCompatibility {
  score: number;
  status: 'Good Match' | 'Moderate Match' | 'Low Match';
  message: string;
  alternatives: string[];
}

export interface PlanData {
  destinationOverview: {
    title: string;
    vibe: string;
    description: string;
  };
  climateCompatibility: ClimateCompatibility;
  weatherSummary: WeatherSummary;
  dailyWeather: DailyWeather[];
  hiddenGems: HiddenGem[];
  personalizedRecommendations: PersonalizedRecommendation[];
  itinerary: ItineraryDay[];
  recommendedStays: {
    budget: StayOption;
    midRange: StayOption;
    premium: StayOption;
  };
  localFoods: Array<{
    name: string;
    description: string;
  }>;
  transportOptions: Array<{
    type: string;
    estimatedCost: string;
    tip: string;
  }>;
  budgetBreakdown: {
    stay: string;
    food: string;
    transport: string;
    activities: string;
    miscellaneous: string;
    total: string;
  };
  travelTips: string[];
}
