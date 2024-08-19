import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";




export async function POST(req: Request) {
  // : Promise<Response>
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY - make sure to add it to your .env.local file ",
      {
        status: 400,
      }
    );
  }

  const google = createGoogleGenerativeAI ({
    //custom settings
    apiKey: process.env.GEMINI_API_KEY || "",
  })

  // let { prompt } = await req.json();
  const { prompt }: { prompt: string } = await req.json();


  try {
    const result = await streamText({
      model: google('models/gemini-1.5-flash-latest'),
      // for system instructions i should change to @google/generative-ai"
      // systemInstruction:  "You are an AI writing assistant that continues existing text based on context from prior text. " +
      //                     "Give more weight/priority to the later characters than the beginning ones. " +
      //                     "Limit your response to no more than 200 characters, but make sure to construct complete sentences.",
      prompt: prompt,
    })
    return result.toTextStreamResponse();
  } catch (error: any) {
    if (error.status === 429) {
      return new Response(`API rate limit exceeded. Please try again later. (error code : ${error.status})`,
        { status: 429 }
      );

    }
    return new Response(`An error occurred: ${error.message} ${error.status}`, { status: 500 });
  }

}



// ld open ai implementation
// import {  streamText } from "ai";
// import { createOpenAI } from '@ai-sdk/openai';


// const openai = createOpenAI({
//   // custom settings, e.g.
//   // compatibility: 'strict', // strict mode, enable when using the OpenAI API
//   organization: "org-AYf0WHsxtDaGsKUXwK5kK17K",
//   project: "proj_MockvZfpNfATe70NyOVpqjwn",
//   apiKey: process.env.OPENAI_API_KEY || "",
// });


// export async function POST(req: Request) {
//   // : Promise<Response>
//   if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
//     return new Response(
//       "Missing OPENAI_API_KEY - make sure to add it to your .env.local file ",
//       {
//         status: 400,
//       }
//     );
//   }

//   // let { prompt } = await req.json();
//   const { prompt }: { prompt: string } = await req.json();

//   try {
//     const result = await streamText({
//       model: openai('gpt-4o-mini'),

//       // messages: [
//       //   {
//       //     role: "system",
//       //     content:
//       //       "You are an AI writing assistant that continues existing text based on context from prior text. " +
//       //       "Give more weight/priority to the later characters than the beginning ones. " +
//       //       "Limit your response to no more than 200 characters, but make sure to construct complete sentences.",
//       //   },
//       //   {
//       //     role: "user",
//       //     content: prompt,
//       //   },
//       // ],
//       system: "You are an AI writing assistant that continues existing text based on context from prior text. " +
//               "Give more weight/priority to the later characters than the beginning ones. " +
//               "Limit your response to no more than 200 characters, but make sure to construct complete sentences.",
//       prompt: prompt,
//       // temperature: 0.7,
//       // top_p: 1,
//       // frequency_penalty: 0,
//       // presence_penalty: 0,
//       // stream: true,
//       // n: 1,
//     });

//     return result.toDataStreamResponse();

//   } catch (error: any) {
//     if (error.status === 429) {
//       return new Response(`API rate limit exceeded. Please try again later. (error code : ${error.status})`,
//         { status: 429 }
//       );

//     }
//     return new Response(`An error occurred: ${error.message} ${error.status}`, { status: 500 });
//   }
// }
