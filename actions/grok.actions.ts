"use server";

import Groq from "groq-sdk";
import { Chat } from "@/models/chat.model";
import { connectDb } from "@/utils/connectDb";
import { parseJSON } from "@/utils/parseJSON";
import { currentUser } from "@clerk/nextjs/server";

export async function fetchAIResponse(userMessage: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Missing GROQ_API_KEY");

  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: userMessage }],
    model: "llama-3.3-70b-versatile",
  });

  const aiResponse =
    completion.choices[0]?.message?.content ||
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
