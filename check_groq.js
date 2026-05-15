import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function testGroq() {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: "Hello",
        },
      ],
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
  }
}

testGroq();