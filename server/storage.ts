import { 
  categories, 
  contactMessages, 
  portfolioItems, 
  testimonials, 
  users, 
  type Category, 
  type ContactMessage, 
  type InsertCategory, 
  type InsertContactMessage, 
  type InsertPortfolioItem, 
  type InsertTestimonial, 
  type InsertUser, 
  type PortfolioItem, 
  type Testimonial, 
  type User 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Portfolio items methods
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemsByCategory(categoryId: number): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private portfolioItems: Map<number, PortfolioItem>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  
  private userCurrentId: number;
  private categoryCurrentId: number;
  private portfolioItemCurrentId: number;
  private testimonialCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.portfolioItems = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.portfolioItemCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.contactMessageCurrentId = 1;
    
    // Initialize with default data
    this.initializeData();
  }

  private initializeData() {
    // Default categories
    const categories = [
      { id: this.categoryCurrentId++, name: "Все работы", slug: "all" },
      { id: this.categoryCurrentId++, name: "Мероприятия", slug: "events" },
      { id: this.categoryCurrentId++, name: "Детская съемка", slug: "children" },
      { id: this.categoryCurrentId++, name: "Портреты", slug: "portraits" }
    ];
    
    categories.forEach(category => this.categories.set(category.id, category));
    
    // Default portfolio items
    const portfolioItems = [
      {
        id: this.portfolioItemCurrentId++,
        title: "Корпоративное событие",
        description: "Ежегодная конференция IT-компании",
        imageUrl: "https://images.unsplash.com/photo-1525286335722-c30c6b5dfee3?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 2, // events
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Художественный портрет",
        description: "Творческая студийная съемка",
        imageUrl: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=800&h=1200",
        categoryId: 4, // portraits
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Детский портрет",
        description: "Естественная съемка на природе",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b40?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 3, // children
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Свадебная съемка",
        description: "Июнь 2023, Петропавловск",
        imageUrl: "https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 2, // events
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Мужской портрет",
        description: "Деловая фотосессия",
        imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 4, // portraits
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Семейная съемка",
        description: "Домашняя фотосессия",
        imageUrl: "https://images.unsplash.com/photo-1592711938300-d5568409702e?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 3, // children
        order: 2
      }
    ];
    
    portfolioItems.forEach(item => this.portfolioItems.set(item.id, item));
    
    // Default testimonials
    const testimonials = [
      {
        id: this.testimonialCurrentId++,
        name: "Анна и Михаил",
        role: "Свадебная фотосессия",
        content: "Сергей создал потрясающую атмосферу во время съемки. Фотографии получились естественными и живыми, именно такими, как мы хотели.",
        order: 1
      },
      {
        id: this.testimonialCurrentId++,
        name: "Екатерина",
        role: "Детская фотосессия",
        content: "Профессионал своего дела! Сергей умеет найти подход к детям — наша дочь обычно стесняется фотографов, но с ним чувствовала себя комфортно.",
        order: 2
      },
      {
        id: this.testimonialCurrentId++,
        name: "Алексей",
        role: "Директор IT-компании",
        content: "Сергей фотографировал наше корпоративное мероприятие. Результат превзошел все ожидания! Рекомендую для любых событий.",
        order: 3
      }
    ];
    
    testimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.id - b.id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Portfolio items methods
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).sort((a, b) => a.order - b.order);
  }
  
  async getPortfolioItemsByCategory(categoryId: number): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values())
      .filter(item => item.categoryId === categoryId)
      .sort((a, b) => a.order - b.order);
  }
  
  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.portfolioItemCurrentId++;
    const item: PortfolioItem = { ...insertItem, id };
    this.portfolioItems.set(id, item);
    return item;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => a.order - b.order);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(), 
      read: false 
    };
    this.contactMessages.set(id, message);
    return message;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
