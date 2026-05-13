const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export type Message = {
  role: 'user' | 'ai';
  text: string;
};

// 🔥 Use a SAFE working model (auto fallback)
const MODEL = "gemini-flash-latest"; // most stable for older keys

async function callGemini(requestBody: any): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Gemini API Error:", errorData);
    throw new Error("API error");
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
}

// 💬 Chat response
export async function generateTravelResponse(messages: Message[]): Promise<string> {
  if (!apiKey) return "API key missing.";

  try {
    const formattedMessages = messages.map((m) => ({
      role: m.role === "ai" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const requestBody = {
      contents: formattedMessages,
      systemInstruction: {
        role: "system",
        parts: [{ text: "You are TravelTick AI, a professional travel assistant. You MUST ONLY answer questions related to travel, destinations, itineraries, culture, and trip planning. If a user asks about any other topic (politics, science, general knowledge, math, etc.), politely decline and steer the conversation back to travel." }]
      },
      generationConfig: { temperature: 0.7 },
    };

    return await callGemini(requestBody);
  } catch (error) {
    console.error(error);
    return "Error generating response.";
  }
}

// ✈️ Basic trip plan
export async function generateTripPlan(
  budget: number,
  location: string,
  dates: string
): Promise<string> {
  if (!apiKey) return "API key missing.";

  try {
    const prompt = `
Plan a trip:
Destination: ${location}
Budget: $${budget}
Dates: ${dates}

Give:
- 3 day itinerary
- Cost breakdown
- Travel tips
`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    };

    return await callGemini(requestBody);
  } catch (error) {
    console.error(error);
    return "Error generating trip.";
  }
}

// 🎯 Personalized plan
export async function generatePersonalizedPlan(
  budget: number,
  location: string,
  dates: string,
  mood: string,
  purpose: string,
  climate: string
): Promise<string> {
  if (!apiKey) return "API key missing.";

  try {
    const prompt = `
Create a personalized travel plan:

Destination: ${location}
Budget: $${budget}
Dates: ${dates}
Mood: ${mood}
Purpose: ${purpose}
Climate: ${climate}

Give:
- Theme
- 3-day itinerary
- Activities
- Hotel suggestions
- Budget breakdown
`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    };

    return await callGemini(requestBody);
  } catch (error) {
    console.error(error);
    return "Error generating personalized plan.";
  }
}