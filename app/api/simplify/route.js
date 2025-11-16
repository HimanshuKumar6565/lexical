import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a text simplification model similar to BERT. Your task is to simplify the following text while maintaining its core meaning. Replace complex words with simpler alternatives, shorten sentences if needed, and make the text more accessible. Do not add explanations, just return the simplified version.

Original text: ${text}

Simplified text:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const simplifiedText = response.text().trim();

    return NextResponse.json({ simplifiedText });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to simplify text" },
      { status: 500 }
    );
  }
}
