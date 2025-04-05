type Language = 'ru' | 'en';

type TranslationDictionary = {
  [key: string]: {
    ru: string;
    en: string;
  };
};

const translations: TranslationDictionary = {
  // Navigation
  'nav.home': {
    ru: 'Главная',
    en: 'Home',
  },
  'nav.portfolio': {
    ru: 'Портфолио',
    en: 'Portfolio',
  },
  'nav.about': {
    ru: 'Обо мне',
    en: 'About',
  },
  'nav.contact': {
    ru: 'Контакты',
    en: 'Contact',
  },
  
  // Hero Section
  'hero.title': {
    ru: 'Сергей Технерядов',
    en: 'Sergey Tekneryad',
  },
  'hero.subtitle': {
    ru: 'Фотограф из Петропавловска, с любовью запечатлевающий особенные моменты вашей жизни',
    en: 'Photographer from Petropavlovsk, capturing the special moments in your life with love',
  },
  'hero.button': {
    ru: 'Портфолио',
    en: 'Portfolio',
  },
  
  // Camera Section
  'camera.title': {
    ru: 'Моя камера',
    en: 'My Camera',
  },
  'camera.description': {
    ru: 'Профессиональная фотосъемка для создания неповторимых воспоминаний',
    en: 'Professional photography to create unique memories',
  },
  
  // Portfolio Section
  'portfolio.title': {
    ru: 'Портфолио',
    en: 'Portfolio',
  },
  'portfolio.description': {
    ru: 'Я фотографирую любые события вашей жизни: свадьбы, детские праздники, семейные встречи, юбилеи, корпоративы и любые другие мероприятия. Также провожу индивидуальные и групповые фотосессии в студии или на природе',
    en: 'I photograph any events in your life: weddings, children\'s parties, family gatherings, anniversaries, corporate events and any other occasions. I also conduct individual and group photoshoots in the studio or outdoors',
  },
  'portfolio.allWorks': {
    ru: 'Все работы',
    en: 'All Works',
  },
  'portfolio.portraits': {
    ru: 'Портреты',
    en: 'Portraits',
  },
  'portfolio.children': {
    ru: 'Детская съемка',
    en: 'Children',
  },
  'portfolio.family': {
    ru: 'Семейная съемка',
    en: 'Family',
  },
  'portfolio.landscapes': {
    ru: 'Пейзажи и архитектура',
    en: 'Landscapes & Architecture',
  },
  'portfolio.animals': {
    ru: 'Животные',
    en: 'Animals',
  },
  
  // About Section
  'about.title': {
    ru: 'Обо мне',
    en: 'About Me',
  },
  'about.bio1': {
    ru: 'Привет! Меня зовут Сергей Технерядов, я начинающий фотограф из живописного города Петропавловск, Казахстан.',
    en: 'Hello! My name is Sergey Tekneryad, I am an aspiring photographer from the picturesque city of Petropavlovsk, Kazakhstan.',
  },
  'about.bio2': {
    ru: 'Фотография — это мое увлечение, которое переросло в нечто большее. Я стремлюсь запечатлеть искренние эмоции и важные моменты вашей жизни, чтобы они остались с вами навсегда. Для меня каждая фотография — это история, которую вы сможете пересматривать снова и снова.',
    en: 'Photography is my passion that has grown into something more. I strive to capture sincere emotions and important moments in your life so they stay with you forever. For me, each photograph is a story that you can revisit again and again.',
  },
  'about.bio3': {
    ru: 'Я готов к проведению абсолютно любого вида фотосъемки - будь то свадьба, детский праздник, семейное торжество, юбилей, корпоративное мероприятие или индивидуальная фотосессия в студии или на природе. Всегда открыт для новых идей и творческих экспериментов!',
    en: 'I am ready to conduct absolutely any type of photography - be it a wedding, children\'s party, family celebration, anniversary, corporate event or individual photoshoot in the studio or outdoors. Always open to new ideas and creative experiments!',
  },
  'about.stats.clients': {
    ru: 'довольных клиентов',
    en: 'satisfied clients',
  },
  'about.stats.experience': {
    ru: 'лет опыта',
    en: 'years of experience',
  },
  'about.stats.photos': {
    ru: 'фотографий',
    en: 'photographs',
  },
  'about.testimonials': {
    ru: 'Что говорят клиенты',
    en: 'Client Testimonials',
  },
  
  // Testimonials Section
  'testimonials.title': {
    ru: 'Отзывы',
    en: 'Testimonials',
  },
  'testimonials.description': {
    ru: 'Узнайте, что говорят мои клиенты о работе со мной и о результатах съемок',
    en: 'Learn what my clients say about working with me and the results of their photoshoots',
  },
  
  // Contact Section
  'contact.title': {
    ru: 'Связаться со мной',
    en: 'Contact Me',
  },
  'contact.description': {
    ru: 'Готовы запечатлеть важные моменты вашей жизни? Свяжитесь со мной для обсуждения деталей и бронирования съемки.',
    en: 'Ready to capture important moments in your life? Contact me to discuss details and book a photoshoot.',
  },
  'contact.email': {
    ru: 'Электронная почта',
    en: 'Email',
  },
  'contact.phone': {
    ru: 'Телефон',
    en: 'Phone',
  },
  'contact.whatsapp': {
    ru: 'WhatsApp',
    en: 'WhatsApp',
  },
  'contact.availability': {
    ru: 'Я готов провести для вас фотосъемку любого формата и сложности. Свадьбы, портреты, семейные торжества, корпоративы, детские праздники, студийная фотография - обращайтесь с любыми идеями! Буду рад ответить на ваши вопросы!',
    en: 'I am ready to conduct a photoshoot of any format and complexity for you. Weddings, portraits, family celebrations, corporate events, children\'s parties, studio photography - contact me with any ideas! I\'ll be happy to answer your questions!',
  },
  'contact.address': {
    ru: 'Адрес',
    en: 'Address',
  },
  'contact.location': {
    ru: 'г. Петропавловск\nКазахстан',
    en: 'Petropavlovsk\nKazakhstan',
  },
  'contact.contactInfo': {
    ru: 'Контакты',
    en: 'Contact Info',
  },
  'contact.socialMedia': {
    ru: 'Социальные сети',
    en: 'Social Media',
  },
  
  // Footer
  'footer.copyright': {
    ru: '© 2025 Сергей Технерядов. Все права защищены',
    en: '© 2025 Sergey Tekneryad. All rights reserved',
  },
};

class I18nService {
  private currentLanguage: Language = 'ru';
  
  constructor() {
    // Try to load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      this.currentLanguage = savedLanguage;
    }
  }
  
  getLanguage(): Language {
    return this.currentLanguage;
  }
  
  setLanguage(language: Language): void {
    this.currentLanguage = language;
    localStorage.setItem('language', language);
    // Trigger a re-render by dispatching a custom event
    window.dispatchEvent(new Event('languageChange'));
  }
  
  toggleLanguage(): void {
    const newLanguage = this.currentLanguage === 'ru' ? 'en' : 'ru';
    this.setLanguage(newLanguage);
  }
  
  translate(key: string): string {
    if (!translations[key]) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    
    return translations[key][this.currentLanguage];
  }
}

export const i18n = new I18nService();
