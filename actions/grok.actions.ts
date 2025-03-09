"use server";
"use server";

import { Chat } from "@/models/chat.model";
import { connectDb } from "@/utils/connectDb";
import { parseJSON } from "@/utils/parseJSON";
import { currentUser } from "@clerk/nextjs/server";

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

  const aiResponse =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, I couldn't generate a response.";

  try {
    await connectDb();

    const user = await currentUser();

    const userId = user?.id;

    const chat = await Chat.findOne({ userId });

    if (chat) {
      chat.messages.push({ role: "user", content: userMessage });
      chat.messages.push({ role: "assistant", content: aiResponse });
      await chat.save();
    } else {
      await Chat.create({
        userId,
        messages: [
          { role: "user", content: userMessage },
          { role: "assistant", content: aiResponse },
        ],
      });
    }
  } catch (error) {
    console.error("Error saving chat:", error);
  }

  return aiResponse;
}

export async function fetchUserMessages() {
  try {
    await connectDb();

    const user = await currentUser();
    const userId = user?.id;

    const chat = await Chat.findOne({ userId });

    return parseJSON(chat ? chat.messages : []);
  } catch (error) {
    console.error("Error fetching user messages:", error);
    return [];
  }
}
