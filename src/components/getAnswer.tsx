"use server";

import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export async function getAnswer(question: string) {
  const google = createGoogleGenerativeAI({
    //custom settings
    apiKey: process.env.GEMINI_API_KEY || "",
  });

  const systemInstruction: string =
    "You are an AI writing assistant that continues existing text based on context from prior text.\nGive more weight/priority to the later characters than the beginning ones.\nIf you get any context, request or question which you think its forbidden or its out of study & note taking context just refuse to reply for that and tell the reason you did not reply.\n\nPlease summarize the following document content in a concise and informative manner, focusing on key points, main ideas, and important details. The summary should be clear and easy to understand, capturing the essence of the document while excluding unnecessary information. The summary should not be a description of the document's contents but rather a summary of the contents.\n";

  try {
    const { text, finishReason, usage } = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt: systemInstruction + question,
    });

    return { text, finishReason, usage };
  } catch (error: any) {
    if (error.status === 429) {
      return new Response(
        `API rate limit exceeded. Please try again later. (error code : ${error.status})`,
        { status: 429 }
      );
    }
    return new Response(`An error occurred: ${error.message} ${error.status}`, {
      status: 500,
    });
  }
}
