import { generateText, streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyCjkIdXduS72mk1RWcO3HRnAmfmj-L6K1E",
});

export const maxDuration = 30; // 30 second timeout

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `You are the exclusive Sourcing Concierge for Almasi Automotive.
You assist our elite clientele in finding and importing luxury, high-performance, and ultra-rare vehicles into Kenya.
Your tone should be highly professional, discrete, sophisticated, and helpful. 
You can answer questions regarding import taxes, shipping timelines, global market availability, vehicle specifications, and Almasi's white-glove import process. 
Always aim to collect the user's specific preferences (Make, Model, Year, Budget, Specs) so a human agent can later finalize the physical sourcing.
If asked about things unrelated to luxury vehicles or Almasi's services, politely steer the conversation back to vehicle sourcing.`;

        const result = await streamText({
            model: google('gemini-pro'),
            system: systemPrompt,
            messages,
        });

        return result.toAIStreamResponse();
    } catch (error) {
        console.error("AI Sourcing Agent Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
