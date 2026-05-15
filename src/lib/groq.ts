import OpenAI from "openai";

export type Message = {
  role: "user" | "ai";
  text: string;
};

// ✅ Groq Client
const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

// ✅ Main AI Function
export async function callGroq(prompt: string): Promise<string> {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096, // Increased for more detailed responses
    });

    return (
      completion.choices?.[0]?.message?.content ||
      "No response generated."
    );
  } catch (error) {
    console.error("Groq Error:", error);
    return "Something went wrong.";
  }
}

// ✈️ Premium Trip Planner with Weather
export async function generateTripPlan(
  budget: number,
  destination: string,
  dates: string,
  weatherSummary: any
): Promise<string> {
  if (budget < 500) {
    return "Minimum travel budget should be ₹500 INR.";
  }

  const prompt = `
You are TravelTick AI, a premium intelligent travel planner designed to create realistic, personalized, cinematic, and locally curated travel experiences.

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT add explanations outside JSON.
- Use ONLY INR currency (₹).
- Minimum budget must be ₹500 INR.

CLIMATE COMPATIBILITY RULES:
- Analyze if the destination's current weather in ${dates} is suitable for a general traveler.
- Provide a compatibility score (0-100), status, and helpful message.

QUALITY RULES:
- Recommendations must feel handcrafted by a local travel expert.
- HIDDEN GEM PROTOCOL: Hidden gems MUST be lesser-known attractions, cultural spots, artistic locations, scenic viewpoints, local experiences, peaceful cafés, or unique neighborhoods. Strictly exclude generic roads, transit areas, or LUXURY HOTELS from hidden gems.
- REAL-WORLD GROUNDING: ONLY recommend VERIFIED and widely recognized restaurants, hotels, and attractions. Fictional or hallucinated places are strictly forbidden. Prefer geographically accurate locations that feel authentic to locals.
- REAL LOCATION VALIDATION: Never generate generic placeholder names like "Sandy Beach", "Local Café", "City Restaurant", or "Famous Market". Every recommendation MUST be REAL, RECOGNIZABLE, and RELEVANT to the destination city.
- ACTION-ORIENTED DESCRIPTIONS: Every activity must be specific and immersive (e.g., "Walk along the Marina promenade and try roasted corn from local vendors ✨").
- STRICT LOCATION CONSISTENCY: ONLY recommend attractions, temples, cafés, restaurants, and hidden gems that exist inside or near the selected destination (${destination}). Never reuse attractions from previous cities. Double-check city consistency before generating.
- BUDGET CONSISTENCY: Hotel and restaurant recommendations MUST strictly align with the user's budget (₹${budget}). Avoid luxury stays in low or medium budget plans. Dynamically scale stay and dining recommendations according to budget level.
- ANTI-REPETITION: Do NOT repeat the same attraction or specific place across multiple days. A place can appear only once in the entire itinerary.
- NO FILLER ACTIVITIES: Strictly avoid generic activities like: "explore the city", "relax at café", "scenic drive", "visit local market", "try local cuisine", "relax at hotel".
- THEMATIC DIVERSITY: Every day must feel unique and intentional. Ensure diversity across culture, nature, food, nightlife, relaxation, adventure, photography, and local experiences.
- QUALITY OVER QUANTITY: Prefer shorter premium itineraries over long repetitive ones. If meaningful activities are limited, generate fewer days with higher quality instead of repetitive filler.
- Avoid generic tourist brochure style responses.
- Luxury activities should NOT appear in low-budget trips.
- Include aesthetic cafés, local eateries, scenic viewpoints, peaceful spots, cultural experiences, photography spots, rooftop cafés, nature escapes, and authentic local experiences.

STYLE RULES:
- Keep descriptions concise but immersive.
- Use cinematic and emotionally engaging wording in short sentences.
- Make activities feel memorable and aesthetic.
- Recommendations should feel modern, premium, and social-media-worthy.
- Group nearby activities together realistically.

WEATHER RULES:
- Analyze REAL WEATHER DATA carefully.
- Adjust activities according to weather conditions.
- Sunny weather: viewpoints, outdoor cafés, beaches, walking tours, scenic drives, sunset spots.
- Rainy weather: indoor cafés, museums, cultural spaces, bookstores, shopping streets, cozy experiences.
- Cloudy weather: sightseeing, photography spots, nature walks.
- Mention clothing suggestions based on weather.
- Warn users if weather may affect activities.

TRAVEL DETAILS:
Destination: ${destination}
Travel Dates: ${dates}
Budget: ₹${budget} INR
Traveler Type: General Traveler
Traveler Interests: Sightseeing, Local Food, Hidden Gems

REAL WEATHER DATA:
${JSON.stringify(weatherSummary)}

RETURN JSON IN THIS EXACT STRUCTURE:

{
  "destinationOverview": {
    "title": "",
    "vibe": "",
    "description": ""
  },

  "climateCompatibility": {
    "score": 95,
    "status": "Excellent Match",
    "message": "",
    "alternatives": []
  },

  "weatherSummary": {
    "overallCondition": "",
    "temperatureRange": "",
    "bestDayToExplore": "",
    "clothingSuggestion": "",
    "weatherWarning": ""
  },

  "dailyWeather": [
    {
      "date": "",
      "temperature": "",
      "condition": "",
      "rainChance": "",
      "travelAdvice": ""
    }
  ],

  "hiddenGems": [
    {
      "name": "",
      "category": "",
      "whySpecial": "",
      "bestTimeToVisit": ""
    }
  ],

  "personalizedRecommendations": [
    {
      "place": "",
      "category": "",
      "reason": ""
    }
  ],

  "itinerary": [
    {
      "day": 1,
      "theme": "",
      "weatherCondition": "",
      "morningActivity": { "title": "", "description": "" },
      "afternoonActivity": { "title": "", "description": "" },
      "eveningActivity": { "title": "", "description": "" },
      "foodSpot": { "name": "", "speciality": "" },
      "hiddenGem": { "name": "", "whyVisit": "" },
      "estimatedCost": "",
      "alternativeRainPlan": ""
    }
  ],

  "recommendedStays": {
    "budget": { "name": "", "priceRange": "", "whyRecommended": "" },
    "midRange": { "name": "", "priceRange": "", "whyRecommended": "" },
    "premium": { "name": "", "priceRange": "", "whyRecommended": "" }
  },

  "localFoods": [
    { "name": "", "description": "" }
  ],

  "transportOptions": [
    { "type": "", "estimatedCost": "", "tip": "" }
  ],

  "budgetBreakdown": {
    "stay": "",
    "food": "",
    "transport": "",
    "activities": "",
    "miscellaneous": "",
    "total": ""
  },

  "travelTips": [ "" ]
}
`;

  return await callGroq(prompt);
}

// 💬 Chatbot Response
export async function generateTravelResponse(
  messages: Message[]
): Promise<string> {
  const lastMessage = messages[messages.length - 1]?.text || "";

  const prompt = `
You are TravelTick AI, an advanced travel assistant.

Rules:
- ONLY answer travel-related questions
- Be friendly and smart
- Suggest destinations, hotels, activities, food, and travel tips
- Refuse unrelated questions politely

User Question:
${lastMessage}
`;

  return await callGroq(prompt);
}

// 🎯 Personalized AI Trip with Weather
export async function generatePersonalizedPlan(
  budget: number,
  destination: string,
  dates: string,
  mood: string,
  purpose: string,
  climate: string,
  travelerType: string = "Solo Traveler",
  interests: string = "Culture, Food, Photography",
  weatherSummary: any
): Promise<string> {
  if (budget < 500) {
    return "Minimum travel budget should be ₹500 INR.";
  }

  const prompt = `
You are TravelTick AI, a premium intelligent travel planner designed to create realistic, personalized, cinematic, and locally curated travel experiences.

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT add explanations outside JSON.
- Use ONLY INR currency (₹).
- Minimum budget must be ₹500 INR.

CLIMATE COMPATIBILITY RULES:
- CRITICAL: Compare the User's Preferred Climate (${climate}) with the Real Weather in ${destination} during ${dates}.
- If User prefers "Cold" and destination is "Hot" (e.g. Goa in summer) → Score < 40%, Status: "Low Match".
- If User prefers "Tropical" and destination is "Cold" (e.g. Manali in winter) → Score < 40%, Status: "Low Match".
- If weather matches preference perfectly → Score > 90%, Status: "Excellent Match".
- In "message": Be friendly. If Low Match, say: "⚠ Climate Preference Mismatch. [Destination] typically experiences [Actual Weather] during your dates."
- In "alternatives": If Low Match, suggest 3 real destinations that actually match the User's Preferred Climate (${climate}) during these dates.

QUALITY RULES:
- Recommendations must feel handcrafted by a local travel expert.
- HIDDEN GEM PROTOCOL: Hidden gems MUST be lesser-known attractions, cultural spots, artistic locations, scenic viewpoints, local experiences, peaceful cafés, or unique neighborhoods. Strictly exclude generic roads, transit areas, or LUXURY HOTELS from hidden gems.
- REAL-WORLD GROUNDING: ONLY recommend VERIFIED and widely recognized restaurants, hotels, and attractions. Fictional or hallucinated places are strictly forbidden. Prefer geographically accurate locations that feel authentic to locals.
- REAL LOCATION VALIDATION: Never generate generic placeholder names like "Sandy Beach", "Local Café", "City Restaurant", or "Famous Market". Every recommendation MUST be REAL, RECOGNIZABLE, and RELEVANT to the destination city.
- ACTION-ORIENTED DESCRIPTIONS: Every activity must be specific and immersive (e.g., "Walk along the Marina promenade and try roasted corn from local vendors ✨").
- STRICT LOCATION CONSISTENCY: ONLY recommend attractions, temples, cafés, restaurants, and hidden gems that exist inside or near the selected destination (${destination}). Never reuse attractions from previous cities. Double-check city consistency before generating.
- BUDGET CONSISTENCY: Hotel and restaurant recommendations MUST strictly align with the user's budget (₹${budget}). Avoid luxury stays in low or medium budget plans. Dynamically scale stay and dining recommendations according to budget level.
- ANTI-REPETITION: Do NOT repeat the same attraction or specific place across multiple days. A place can appear only once in the entire itinerary.
- NO FILLER ACTIVITIES: Strictly avoid generic activities like: "explore the city", "relax at café", "scenic drive", "visit local market", "try local cuisine", "relax at hotel".
- THEMATIC DIVERSITY: Every day must feel unique and intentional. Ensure diversity across culture, nature, food, nightlife, relaxation, adventure, photography, and local experiences.
- QUALITY OVER QUANTITY: Prefer shorter premium itineraries over long repetitive ones. If meaningful activities are limited, generate fewer days with higher quality instead of repetitive filler.
- SMART ALTERNATIVES: Alternative destinations must closely match the User's Preferred Climate (${climate}). Do NOT suggest tropical spots if the user wants "Cold".
- Avoid generic tourist brochure style responses.
- Luxury activities should NOT appear in low-budget trips.
- Include aesthetic cafés, local eateries, scenic viewpoints, peaceful spots, cultural experiences, photography spots, rooftop cafés, nature escapes, and authentic local experiences.

STYLE RULES:
- Keep descriptions concise but immersive.
- Use cinematic and emotionally engaging wording in short sentences.
- Make activities feel memorable and aesthetic.
- Recommendations should feel modern, premium, and social-media-worthy.
- Group nearby activities together realistically.

WEATHER RULES:
- Analyze REAL WEATHER DATA carefully.
- Adjust activities according to weather conditions.
- Sunny weather: viewpoints, outdoor cafés, beaches, walking tours, scenic drives, sunset spots.
- Rainy weather: indoor cafés, museums, cultural spaces, bookstores, shopping streets, cozy experiences.
- Cloudy weather: sightseeing, photography spots, nature walks.
- Mention clothing suggestions based on weather.
- Warn users if weather may affect activities.

TRAVEL DETAILS:
Destination: ${destination}
Travel Dates: ${dates}
Budget: ₹${budget} INR
Traveler Type: ${travelerType}
Traveler Interests: ${interests}
Mood: ${mood}
Purpose: ${purpose}
Preferred Climate: ${climate}

REAL WEATHER DATA:
${JSON.stringify(weatherSummary)}

RETURN JSON IN THIS EXACT STRUCTURE:

{
  "destinationOverview": {
    "title": "",
    "vibe": "",
    "description": ""
  },

  "climateCompatibility": {
    "score": 0,
    "status": "",
    "message": "",
    "alternatives": []
  },

  "weatherSummary": {
    "overallCondition": "",
    "temperatureRange": "",
    "bestDayToExplore": "",
    "clothingSuggestion": "",
    "weatherWarning": ""
  },

  "dailyWeather": [
    {
      "date": "",
      "temperature": "",
      "condition": "",
      "rainChance": "",
      "travelAdvice": ""
    }
  ],

  "hiddenGems": [
    {
      "name": "",
      "category": "",
      "whySpecial": "",
      "bestTimeToVisit": ""
    }
  ],

  "personalizedRecommendations": [
    {
      "place": "",
      "category": "",
      "reason": ""
    }
  ],

  "itinerary": [
    {
      "day": 1,
      "theme": "",
      "weatherCondition": "",
      "morningActivity": { "title": "", "description": "" },
      "afternoonActivity": { "title": "", "description": "" },
      "eveningActivity": { "title": "", "description": "" },
      "foodSpot": { "name": "", "speciality": "" },
      "hiddenGem": { "name": "", "whyVisit": "" },
      "estimatedCost": "",
      "alternativeRainPlan": ""
    }
  ],

  "recommendedStays": {
    "budget": { "name": "", "priceRange": "", "whyRecommended": "" },
    "midRange": { "name": "", "priceRange": "", "whyRecommended": "" },
    "premium": { "name": "", "priceRange": "", "whyRecommended": "" }
  },

  "localFoods": [
    { "name": "", "description": "" }
  ],

  "transportOptions": [
    { "type": "", "estimatedCost": "", "tip": "" }
  ],

  "budgetBreakdown": {
    "stay": "",
    "food": "",
    "transport": "",
    "activities": "",
    "miscellaneous": "",
    "total": ""
  },

  "travelTips": [ "" ]
}
`;

  return await callGroq(prompt);
}