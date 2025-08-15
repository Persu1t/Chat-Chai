"use server";
import { OpenAI } from "openai";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { generatePersona } from "../utils/generatePersona";

const client = new OpenAI();
const elevenResponse = new ElevenLabsClient({
  apiKey: process.env.NEXT_API_KEY_ELEVENLABS
});

// 1️⃣ Text generation action
let conversationHistory = [
  { role: "system", content: generatePersona("piyush") }
];

export async function generateText(input) {
  conversationHistory.push({ role: "user", content: input });
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: conversationHistory
  });

  const aiMessage = response.choices[0].message.content;
  conversationHistory.push({ role: "assistant", content: aiMessage });

  return { text: aiMessage };
}

// 2️⃣ Audio generation action
export async function generateAudio(text) {
  // removing emojis and extra spaces
  const cleanText = text
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const audioResponse = await elevenResponse.textToSpeech.convert(
    process.env.NEXT_PIYUSH_VOICE_ID,
    {
      text: cleanText,
      modelId: "eleven_multilingual_v2",
    }
  );

  const audioChunks = [];
  for await (const chunk of audioResponse) {
    audioChunks.push(chunk);
  }
  const audioBuffer = Buffer.concat(audioChunks);
  const audioBase64 = audioBuffer.toString("base64");

  return { audio: `data:audio/mpeg;base64,${audioBase64}` };
}
