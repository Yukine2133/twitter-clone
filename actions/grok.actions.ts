"use server";

export async function fetchAIResponse(userMessage: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    throw new Error("Missing GEMINI_API_KEY in environment variables");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userMessage }] }],
    }),
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error?.message || "Failed to fetch AI response");

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, I couldn't generate a response."
  );
}
