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
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private portfolioItems: Map<number, PortfolioItem>;
  private contactMessages: Map<number, ContactMessage>;
  
  private userCurrentId: number;
  private categoryCurrentId: number;
  private portfolioItemCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.portfolioItems = new Map();
    this.contactMessages = new Map();
    
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.portfolioItemCurrentId = 1;
    this.contactMessageCurrentId = 1;
    
    // Initialize with default data
    this.initializeData();
  }

  private initializeData() {
    // Default categories
    const categories = [
      { id: this.categoryCurrentId++, name: "Все работы", slug: "all" },
      { id: this.categoryCurrentId++, name: "Портреты", slug: "portraits" },
      { id: this.categoryCurrentId++, name: "Детская съемка", slug: "children" },
      { id: this.categoryCurrentId++, name: "Семейная съемка", slug: "family" },
      { id: this.categoryCurrentId++, name: "Пейзажи и архитектура", slug: "landscapes" },
      { id: this.categoryCurrentId++, name: "Животные", slug: "animals" }
    ];
    
    categories.forEach(category => this.categories.set(category.id, category));
    
    // Default portfolio items
    const portfolioItems = [
      // Портреты (Portraits)
      {
        id: this.portfolioItemCurrentId++,
        title: "Мужской деловой портрет",
        description: "Профессиональная фотосессия",
        imageUrl: "assets/photos/portraits/Screenshot_20250405_144014_Instagram.jpg",
        categoryId: 2, // portraits
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Женский портрет в стиле фэшн",
        description: "Художественная фотосессия",
        imageUrl: "assets/photos/portraits/Screenshot_20250405_144027_Instagram.jpg",
        categoryId: 2, // portraits
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Портрет в темных тонах",
        description: "Студийная съемка",
        imageUrl: "assets/photos/portraits/Screenshot_20250405_144421_Instagram.jpg",
        categoryId: 2, // portraits
        order: 3
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Художественный портрет",
        description: "Работа со светом и тенью",
        imageUrl: "assets/photos/portraits/Screenshot_20250405_144258_Instagram.jpg",
        categoryId: 2, // portraits
        order: 4
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Женский портрет на природе",
        description: "Естественное освещение",
        imageUrl: "assets/photos/portraits/Screenshot_20250405_144351_Instagram.jpg",
        categoryId: 2, // portraits
        order: 5
      },
      
      // Детская съемка (Children)
      {
        id: this.portfolioItemCurrentId++,
        title: "Детская фотосессия",
        description: "Радостные моменты",
        imageUrl: "assets/photos/children/Screenshot_20250405_145025_Instagram.jpg",
        categoryId: 3, // children
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Ребенок и природа",
        description: "Летняя фотосессия",
        imageUrl: "assets/photos/children/Screenshot_20250405_145102_Instagram.jpg",
        categoryId: 3, // children
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Детский праздник",
        description: "Яркие эмоции",
        imageUrl: "assets/photos/children/Screenshot_20250405_145213_Instagram.jpg",
        categoryId: 3, // children
        order: 3
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Детский портрет",
        description: "Индивидуальная фотосессия",
        imageUrl: "assets/photos/children/Screenshot_20250405_145510_Instagram.jpg",
        categoryId: 3, // children
        order: 4
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Малыш на прогулке",
        description: "Живые кадры",
        imageUrl: "assets/photos/children/Screenshot_20250405_145548_Instagram.jpg",
        categoryId: 3, // children
        order: 5
      },
      
      // Семейная съемка (Family)
      {
        id: this.portfolioItemCurrentId++,
        title: "Семейная фотосессия",
        description: "Теплые моменты вместе",
        imageUrl: "assets/photos/family/Screenshot_20250405_144056_Instagram.jpg",
        categoryId: 4, // family
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Счастливая семья",
        description: "Портрет всей семьи",
        imageUrl: "assets/photos/family/Screenshot_20250405_144228_Instagram.jpg",
        categoryId: 4, // family
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Семейный отдых",
        description: "Фотосессия на природе",
        imageUrl: "assets/photos/family/Screenshot_20250405_144305_Instagram.jpg",
        categoryId: 4, // family
        order: 3
      },
      
      // Пейзажи и архитектура (Landscapes)
      {
        id: this.portfolioItemCurrentId++,
        title: "Городская архитектура",
        description: "Современный город",
        imageUrl: "assets/photos/landscapes/Screenshot_20250405_144616_Instagram.jpg",
        categoryId: 5, // landscapes
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Горный пейзаж",
        description: "Величественные виды",
        imageUrl: "assets/photos/landscapes/Screenshot_20250405_144636_Instagram.jpg",
        categoryId: 5, // landscapes
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Архитектура города",
        description: "Исторический центр",
        imageUrl: "assets/photos/landscapes/Screenshot_20250405_144807_Instagram.jpg",
        categoryId: 5, // landscapes
        order: 3
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Морской пейзаж",
        description: "Закат у моря",
        imageUrl: "assets/photos/landscapes/Screenshot_20250405_150357_Instagram.jpg",
        categoryId: 5, // landscapes
        order: 4
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Городские улицы",
        description: "Урбанистические пейзажи",
        imageUrl: "assets/photos/landscapes/Screenshot_20250405_150130_Instagram.jpg",
        categoryId: 5, // landscapes
        order: 5
      },
      
      // Животные (Animals)
      {
        id: this.portfolioItemCurrentId++,
        title: "Домашние питомцы",
        description: "Фотосессия с кошкой",
        imageUrl: "assets/photos/animals/Screenshot_20250405_143956_Instagram.jpg",
        categoryId: 6, // animals
        order: 1
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Кошка в студии",
        description: "Профессиональная съемка",
        imageUrl: "assets/photos/children/Screenshot_20250405_145915_Instagram.jpg",
        categoryId: 6, // animals
        order: 2
      },
      {
        id: this.portfolioItemCurrentId++,
        title: "Игривый питомец",
        description: "Живые эмоции",
        imageUrl: "assets/photos/children/Screenshot_20250405_145928_Instagram.jpg",
        categoryId: 6, // animals
        order: 3
      }
    ];
    
    portfolioItems.forEach(item => this.portfolioItems.set(item.id, item));
    
    // Testimonials удалены по запросу клиента
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
  
  // Testimonial methods удалены по запросу клиента
  
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
