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
        title: "Юбилей Ольги, 60 лет",
        description: "Юбилейное торжество в ресторане, март 2024",
        imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 2, // events
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Детский день рождения",
        description: "Праздник Максима, 5 лет",
        imageUrl: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&q=80&w=800&h=1200",
        categoryId: 3, // children
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Семейная прогулка",
        description: "Фотосессия на природе, парк Горького",
        imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 3, // children
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Годовщина свадьбы",
        description: "10 лет вместе, февраль 2024",
        imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 2, // events
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Весенняя фотосессия",
        description: "Индивидуальная съемка на природе",
        imageUrl: "https://images.unsplash.com/photo-1623656122769-58bede72a68e?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 4, // portraits
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Детский праздник",
        description: "Выпускной в детском саду",
        imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800&h=1000",
        categoryId: 3, // children
        order: 3
      }
    ];
    
    portfolioItems.forEach(item => this.portfolioItems.set(item.id, item));
    
    // Default testimonials
    const testimonials = [
      {
        id: this.testimonialCurrentId++,
        name: "Мария Петрова",
        role: "Юбилей 50 лет",
        content: "Огромное спасибо Сергею за фотографии с моего юбилея! Несмотря на то, что он начинающий фотограф, сумел поймать самые искренние эмоции и теплые моменты праздника. Очень рекомендую!",
        order: 1
      },
      {
        id: this.testimonialCurrentId++,
        name: "Елена Смирнова",
        role: "Детский день рождения",
        content: "Сергей отлично справился с фотосъемкой детского праздника. Дети были в восторге, а фотографии получились яркими и живыми. У него определенно есть талант работать с детьми!",
        order: 2
      },
      {
        id: this.testimonialCurrentId++,
        name: "Андрей и Наталья",
        role: "Семейная фотосессия на природе",
        content: "Фотосессия с Сергеем оставила только положительные впечатления. Мы с женой и двумя детьми провели замечательный день на природе, а Сергей сумел создать непринужденную атмосферу и запечатлеть наши искренние улыбки.",
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
    return Array.from(this.portfolioItems.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  
  async getPortfolioItemsByCategory(categoryId: number): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values())
      .filter(item => item.categoryId === categoryId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  
  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.portfolioItemCurrentId++;
    const item: PortfolioItem = { 
      ...insertItem, 
      id, 
      description: insertItem.description || null, 
      order: insertItem.order || 0 
    };
    this.portfolioItems.set(id, item);
    return item;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      order: insertTestimonial.order || 0, 
      role: insertTestimonial.role || null 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const createdAt = new Date();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt, 
      read: false 
    };
    this.contactMessages.set(id, message);
    return message;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => {
        const timeA = a.createdAt ? a.createdAt.getTime() : 0;
        const timeB = b.createdAt ? b.createdAt.getTime() : 0;
        return timeB - timeA;
      });
  }
}

export const storage = new MemStorage();
