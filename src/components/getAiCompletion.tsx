"use server";

import { generateText, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export async function getAiCompletion(question: string) {
  const google = createGoogleGenerativeAI({
    //custom settings
    apiKey: process.env.GEMINI_API_KEY || "",
  });

  const systemInstruction: string =
    "You are an AI writing assistant that continues existing text based on context from prior text.\nGive more weight/priority to the later characters than the beginning ones.\nLimit your response to no more than 200 characters, but make sure to construct complete sentences.\nIf you get any context, request or question which you think its forbidden or its out of study & note taking context you have the rights to refuse replying for that and tell the reason you did not reply.";

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
