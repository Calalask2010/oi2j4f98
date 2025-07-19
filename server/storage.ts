import { type User, type InsertUser, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

// Memory-based storage implementation (no database required)
export class MemoryStorage implements IStorage {
  private users: User[] = [];
  private contactMessages: ContactMessage[] = [];
  private nextUserId = 1;
  private nextMessageId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      username: insertUser.username,
      password: insertUser.password,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const message: ContactMessage = {
      id: this.nextMessageId++,
      name: insertMessage.name,
      email: insertMessage.email,
      phone: insertMessage.phone || null,
      company: insertMessage.company || null,
      message: insertMessage.message,
      language: insertMessage.language || 'ru',
      createdAt: new Date()
    };
    this.contactMessages.push(message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return this.contactMessages
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

// Database storage (fallback if DATABASE_URL is provided)
export class DatabaseStorage implements IStorage {
  private db: any;

  constructor() {
    try {
      const { db } = require("./db");
      this.db = db;
    } catch (error) {
      console.log("Database not available, falling back to memory storage");
      throw error;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const { eq } = await import("drizzle-orm");
    const { users } = await import("@shared/schema");
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { eq } = await import("drizzle-orm");
    const { users } = await import("@shared/schema");
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { users } = await import("@shared/schema");
    const [user] = await this.db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const { contactMessages } = await import("@shared/schema");
    const [message] = await this.db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const { desc } = await import("drizzle-orm");
    const { contactMessages } = await import("@shared/schema");
    return await this.db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }
}

// Auto-detect storage type based on environment
function createStorage(): IStorage {
  if (process.env.DATABASE_URL) {
    try {
      return new DatabaseStorage();
    } catch (error) {
      console.log("Database connection failed, using memory storage");
      return new MemoryStorage();
    }
  } else {
    console.log("No DATABASE_URL provided, using memory storage");
    return new MemoryStorage();
  }
}

export const storage = createStorage();
