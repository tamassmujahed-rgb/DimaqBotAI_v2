import OpenAI from "openai";

// Using OpenAI integration blueprint
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ConversationMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function answerQuestion(question: string, context: ConversationMessage[] = []): Promise<string> {
  const messages: ConversationMessage[] = [
    {
      role: "system",
      content: "You are Digital Brain AI, an intelligent assistant that provides helpful, accurate, and concise answers to questions. Be friendly and professional.",
    },
    ...context.slice(-5), // Keep last 5 messages for context
    {
      role: "user",
      content: question,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-5",
    messages,
    max_completion_tokens: 2048,
  });

  return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
}

export async function generateVideoIdea(topic: string): Promise<string> {
  const prompt = `Generate 3 creative and engaging video ideas about "${topic}". For each idea, provide:
1. A catchy title
2. A brief description (2-3 sentences)
3. Key points to cover

Format the response in a clear, easy-to-read structure.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: "You are a creative content strategist specializing in video content creation. Generate engaging, trend-aware video ideas that will attract viewers.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_completion_tokens: 2048,
  });

  return response.choices[0].message.content || "I couldn't generate video ideas at the moment. Please try again.";
}

export async function generateScript(topic: string, duration?: string): Promise<string> {
  const durationText = duration ? ` for a ${duration} video` : "";
  const prompt = `Write a professional, engaging script${durationText} about "${topic}". Include:
- Hook/Introduction
- Main content points
- Call to action/Conclusion

Make it conversational and viewer-friendly.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: "You are a professional scriptwriter for digital content. Create engaging, well-structured scripts that capture and maintain audience attention.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_completion_tokens: 4096,
  });

  return response.choices[0].message.content || "I couldn't generate the script at the moment. Please try again.";
}

export async function summarizeText(text: string): Promise<string> {
  const prompt = `Please provide a clear, concise summary of the following text. Capture the main points and key takeaways:\n\n${text}`;

  const response = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: "You are an expert at analyzing and summarizing text. Create summaries that are clear, accurate, and highlight the most important information.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_completion_tokens: 2048,
  });

  return response.choices[0].message.content || "I couldn't summarize the text at the moment. Please try again.";
}
