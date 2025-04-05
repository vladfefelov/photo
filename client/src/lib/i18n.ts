type Language = 'ru';

type TranslationDictionary = {
  [key: string]: {
    ru: string;
  };
};

const translations: TranslationDictionary = {
  // Navigation
  'nav.home': {
    ru: 'Главная',
  },
  'nav.portfolio': {
    ru: 'Портфолио',
  },
  'nav.about': {
    ru: 'Обо мне',
  },
  'nav.contact': {
    ru: 'Контакты',
  },
  
  // Hero Section
  'hero.title': {
    ru: 'Сергей Технерядов',
  },
  'hero.subtitle': {
    ru: 'Фотограф из Петропавловска, с любовью запечатлевающий особенные моменты вашей жизни',
  },
  'hero.button': {
    ru: 'Портфолио',
  },
  
  // Camera Section
  'camera.title': {
    ru: 'Моя камера',
  },
  'camera.description': {
    ru: 'Профессиональная фотосъемка для создания неповторимых воспоминаний',
  },
  
  // Portfolio Section
  'portfolio.title': {
    ru: 'Портфолио',
  },
  'portfolio.description': {
    ru: 'Я фотографирую любые события вашей жизни: свадьбы, детские праздники, семейные встречи, юбилеи, корпоративы и любые другие мероприятия. Также провожу индивидуальные и групповые фотосессии в студии или на природе',
  },
  'portfolio.allWorks': {
    ru: 'Все работы',
  },
  'portfolio.portraits': {
    ru: 'Портреты',
  },
  'portfolio.children': {
    ru: 'Детская съемка',
  },
  'portfolio.family': {
    ru: 'Семейная съемка',
  },
  'portfolio.landscapes': {
    ru: 'Пейзажи и архитектура',
  },
  'portfolio.animals': {
    ru: 'Животные',
  },
  'portfolio.events': {
    ru: 'Мероприятия',
  },
  
  // About Section
  'about.title': {
    ru: 'Обо мне',
  },
  'about.bio1': {
    ru: 'Привет! Меня зовут Сергей Технерядов, я начинающий фотограф из живописного города Петропавловск, Казахстан.',
  },
  'about.bio2': {
    ru: 'Фотография — это мое увлечение, которое переросло в нечто большее. Я стремлюсь запечатлеть искренние эмоции и важные моменты вашей жизни, чтобы они остались с вами навсегда. Для меня каждая фотография — это история, которую вы сможете пересматривать снова и снова.',
  },
  'about.bio3': {
    ru: 'Я готов к проведению абсолютно любого вида фотосъемки - будь то свадьба, детский праздник, семейное торжество, юбилей, корпоративное мероприятие или индивидуальная фотосессия в студии или на природе. Всегда открыт для новых идей и творческих экспериментов!',
  },
  'about.stats.clients': {
    ru: 'довольных клиентов',
  },
  'about.stats.experience': {
    ru: 'лет опыта',
  },
  'about.stats.photos': {
    ru: 'фотографий',
  },
  'about.testimonials': {
    ru: 'Что говорят клиенты',
  },
  
  // Testimonials Section
  'testimonials.title': {
    ru: 'Отзывы',
  },
  'testimonials.description': {
    ru: 'Узнайте, что говорят мои клиенты о работе со мной и о результатах съемок',
  },
  
  // Contact Section
  'contact.title': {
    ru: 'Связаться со мной',
  },
  'contact.description': {
    ru: 'Готовы запечатлеть важные моменты вашей жизни? Свяжитесь со мной для обсуждения деталей и бронирования съемки.',
  },
  'contact.email': {
    ru: 'Электронная почта',
  },
  'contact.phone': {
    ru: 'Телефон',
  },
  'contact.whatsapp': {
    ru: 'WhatsApp',
  },
  'contact.availability': {
    ru: 'Я готов провести для вас фотосъемку любого формата и сложности. Свадьбы, портреты, семейные торжества, корпоративы, детские праздники, студийная фотография - обращайтесь с любыми идеями! Буду рад ответить на ваши вопросы!',
  },
  'contact.address': {
    ru: 'Адрес',
  },
  'contact.location': {
    ru: 'г. Петропавловск\nКазахстан',
  },
  'contact.contactInfo': {
    ru: 'Контакты',
  },
  'contact.socialMedia': {
    ru: 'Социальные сети',
  },
  
  // Footer
  'footer.copyright': {
    ru: '© 2025 Сергей Технерядов. Все права защищены',
  },
};

class I18nService {
  private currentLanguage: Language = 'ru';
  
  constructor() {
    // Только русский язык
    localStorage.setItem('language', 'ru');
  }
  
  getLanguage(): Language {
    return 'ru'; // Всегда возвращаем русский
  }
  
  setLanguage(language: Language): void {
    // Ничего не делаем, язык всегда русский
  }
  
  // Больше нет переключения языка
  toggleLanguage(): void {
    // Пустая функция, т.к. у нас только русский язык
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
