import { type Conversation, type InsertConversation, type BotStats, type InsertBotStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Conversation management
  getConversation(telegramUserId: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversationContext(telegramUserId: string, context: any[]): Promise<Conversation | undefined>;
  
  // Bot statistics
  createBotStats(stats: InsertBotStats): Promise<BotStats>;
}

export class MemStorage implements IStorage {
  private conversations: Map<string, Conversation>;
  private botStats: Map<string, BotStats>;

  constructor() {
    this.conversations = new Map();
    this.botStats = new Map();
  }

  async getConversation(telegramUserId: string): Promise<Conversation | undefined> {
    return Array.from(this.conversations.values()).find(
      (conv) => conv.telegramUserId === telegramUserId,
    );
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      id,
      telegramUserId: insertConversation.telegramUserId,
      telegramUsername: insertConversation.telegramUsername || null,
      context: insertConversation.context || [],
      lastMessageAt: insertConversation.lastMessageAt || new Date(),
      createdAt: new Date(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversationContext(telegramUserId: string, context: any[]): Promise<Conversation | undefined> {
    const conversation = await this.getConversation(telegramUserId);
    if (conversation) {
      conversation.context = context;
      conversation.lastMessageAt = new Date();
      this.conversations.set(conversation.id, conversation);
      return conversation;
    }
    return undefined;
  }

  async createBotStats(insertStats: InsertBotStats): Promise<BotStats> {
    const id = randomUUID();
    const stats: BotStats = {
      id,
      ...insertStats,
      executedAt: new Date(),
    };
    this.botStats.set(id, stats);
    return stats;
  }
}

export const storage = new MemStorage();
