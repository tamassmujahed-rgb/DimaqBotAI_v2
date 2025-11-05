import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { bot } from "./services/telegram";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "Digital Brain AI Bot is running",
      timestamp: new Date().toISOString()
    });
  });

  // Bot info endpoint (for the landing page)
  app.get("/api/bot-info", (req, res) => {
    res.json({
      name: "Digital Brain AI",
      description: "Your intelligent Telegram assistant powered by OpenAI GPT-4",
      features: [
        "AI Question Answering",
        "Video Idea Generation",
        "Script Writing",
        "Text Summarization"
      ],
      commands: [
        { command: "/start", description: "Start the bot" },
        { command: "/help", description: "Show help message" },
        { command: "/ask [question]", description: "Ask a question" },
        { command: "/videoidea [topic]", description: "Generate video ideas" },
        { command: "/script [topic]", description: "Create a script" },
        { command: "/summarize [text]", description: "Summarize text" }
      ]
    });
  });

  const httpServer = createServer(app);

  // Initialize Telegram bot
  console.log('Initializing Telegram Bot...');
  
  return httpServer;
}
