import TelegramBot from "node-telegram-bot-api";
import { storage } from "../storage";
import { answerQuestion, generateVideoIdea, generateScript, summarizeText, type ConversationMessage } from "./openai";

const token = process.env.TELEGRAM_BOT_TOKEN;

// Create bot instance with safe initialization
let bot: TelegramBot | null = null;

if (token) {
  try {
    bot = new TelegramBot(token, { polling: true });
    console.log('Telegram Bot initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Telegram bot:', error);
  }
} else {
  console.warn('TELEGRAM_BOT_TOKEN not found. Bot features will be disabled.');
}

export { bot };

// Helper function to send long messages (Telegram has a 4096 character limit)
// Uses plain text to avoid Markdown parsing errors with unescaped characters from OpenAI
async function sendLongMessage(chatId: number, text: string) {
  if (!bot) return;
  
  const maxLength = 4000;
  
  if (text.length <= maxLength) {
    await bot.sendMessage(chatId, text);
    return;
  }

  // Split message into chunks
  const chunks = [];
  let currentChunk = '';
  
  const lines = text.split('\n');
  for (const line of lines) {
    if ((currentChunk + line + '\n').length > maxLength) {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = line + '\n';
    } else {
      currentChunk += line + '\n';
    }
  }
  
  if (currentChunk) chunks.push(currentChunk);

  // Send chunks
  for (const chunk of chunks) {
    await bot.sendMessage(chatId, chunk);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// Command: /start
if (bot) {
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || '';
  const username = msg.from?.username;

  // Track command usage
  await storage.createBotStats({
    command: '/start',
    telegramUserId: userId,
  });

  const welcomeMessage = `Welcome to Digital Brain AI!

I'm your intelligent assistant powered by OpenAI GPT-4. I can help you with:

> Answer Questions - Use /ask [question]
> Generate Video Ideas - Use /videoidea [topic]
> Write Scripts - Use /script [topic]
> Summarize Text - Use /summarize [text]

Type /help anytime to see all available commands.

Let's unlock your digital brain!`;

  await bot!.sendMessage(chatId, welcomeMessage);
});
}

// Command: /help
if (bot) {
bot.onText(/\/help/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || '';

  await storage.createBotStats({
    command: '/help',
    telegramUserId: userId,
  });

  const helpMessage = `Digital Brain AI - Commands

Basic Commands:
• /start - Start the bot
• /help - Show this help message

AI Features:
• /ask [your question] - Ask anything and get intelligent answers
  Example: /ask What is quantum computing?

• /videoidea [topic] - Generate creative video ideas
  Example: /videoidea cooking tutorials

• /script [topic] - Create professional scripts
  Example: /script morning routine

• /summarize [text] - Summarize long texts
  Example: /summarize [paste your text here]

Tips:
- Be specific with your requests for better results
- I remember context from recent messages
- Supported in both English and Arabic

Need assistance? Just ask!`;

  await bot!.sendMessage(chatId, helpMessage);
});
}

// Command: /ask
if (bot) {
bot.onText(/\/ask (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || '';
  const username = msg.from?.username;
  const question = match?.[1];

  if (!question) {
    await bot!.sendMessage(chatId, 'Please provide a question. Usage: /ask [your question]');
    return;
  }

  await storage.createBotStats({
    command: '/ask',
    telegramUserId: userId,
  });

  // Send typing indicator
  await bot!.sendChatAction(chatId, 'typing');

  try {
    // Get or create conversation
    let conversation = await storage.getConversation(userId);
    if (!conversation) {
      conversation = await storage.createConversation({
        telegramUserId: userId,
        telegramUsername: username,
        context: [],
        lastMessageAt: new Date(),
      });
    }

    // Get answer from OpenAI
    const answer = await answerQuestion(question, conversation.context as ConversationMessage[]);

    // Update conversation context
    const updatedContext = [
      ...(conversation.context as ConversationMessage[]).slice(-4),
      { role: 'user' as const, content: question },
      { role: 'assistant' as const, content: answer },
    ];
    await storage.updateConversationContext(userId, updatedContext);

    // Send response
    await sendLongMessage(chatId, `Answer:\n\n${answer}`);
  } catch (error) {
    console.error('Error in /ask command:', error);
    await bot!.sendMessage(chatId, 'An error occurred while processing your question. Please try again.');
  }
});
}

// Command: /videoidea
if (bot) {
bot.onText(/\/videoidea (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || '';
  const topic = match?.[1];

  if (!topic) {
    await bot!.sendMessage(chatId, 'Please provide a topic. Usage: /videoidea [topic]');
    return;
  }

  await storage.createBotStats({
    command: '/videoidea',
    telegramUserId: userId,
  });

  await bot!.sendChatAction(chatId, 'typing');

  try {
    const ideas = await generateVideoIdea(topic);
    await sendLongMessage(chatId, `Video Ideas for "${topic}":\n\n${ideas}`);
  } catch (error) {
    console.error('Error in /videoidea command:', error);
    await bot!.sendMessage(chatId, 'An error occurred while generating video ideas. Please try again.');
  }
});
}

// Command: /script
if (bot) {
bot.onText(/\/script (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || '';
  const topic = match?.[1];

  if (!topic) {
    await bot!.sendMessage(chatId, 'Please provide a topic. Usage: /script [topic]');
    return;
  }

  await storage.createBotStats({
    command: '/script',
    telegramUserId: userId,
  });

  await bot!.sendChatAction(chatId, 'typing');

  try {
    const script = await generateScript(topic);
    await sendLongMessage(chatId, `Script for "${topic}":\n\n${script}`);
  } catch (error) {
    console.error('Error in /script command:', error);
    await bot!.sendMessage(chatId, 'An error occurred while generating the script. Please try again.');
  }
});
}

// Command: /summarize
if (bot) {
bot.onText(/\/summarize (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || '';
  const text = match?.[1];

  if (!text) {
    await bot!.sendMessage(chatId, 'Please provide text to summarize. Usage: /summarize [your text]');
    return;
  }

  await storage.createBotStats({
    command: '/summarize',
    telegramUserId: userId,
  });

  await bot!.sendChatAction(chatId, 'typing');

  try {
    const summary = await summarizeText(text);
    await sendLongMessage(chatId, `Summary:\n\n${summary}`);
  } catch (error) {
    console.error('Error in /summarize command:', error);
    await bot!.sendMessage(chatId, 'An error occurred while summarizing the text. Please try again.');
  }
});
}

// Error handling
if (bot) {
  bot.on('polling_error', (error) => {
    console.error('Telegram polling error:', error);
  });
  console.log('Digital Brain AI Telegram Bot is running...');
}
