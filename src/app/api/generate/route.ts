import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY - make sure to add it to your .env.local file ",
      {
        status: 400,
      }
    );
  }
  // if (
  //   process.env.NODE_ENV != "development" &&
  //   process.env.KV_RESTAPI_URL &&
  //   process.env.KV_RESTAPI_TOKEN
  // ) {
  //   const ip = req.headers.get("x-forwarded-for");
  //   const ratelimit = new Ratelimit({
  //     redis: kv,
  //     limiter: Ratelimit.slidingWindow(50, "1 d"),
  //   });
  //   const { success, limit, reset, remaining } = await ratelimit.limit(
  //     `noteblock_ratelimit_${ip}`
  //   );

  //   if (!success) {
  //     return new Response("You have reached your request limit for the day.", {
  //       status: 429,
  //     });
  //   }
  // }

  let { prompt } = await req.json();

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI writing assistant that continues existing text based on context from prior text. " +
            "Give more weight/priority to the later characters than the beginning ones. " +
            "Limit your response to no more than 200 characters, but make sure to construct complete sentences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    if (error.status === 429) {
      return new Response("API rate limit exceeded. Please try again later.",
        { status: 429, });
    }
    return new Response(`An error occurred: ${error.message}`, { status: 500 });
  }
}
