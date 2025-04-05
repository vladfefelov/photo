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
  
  // Portfolio Section
  'portfolio.title': {
    ru: 'Портфолио',
    en: 'Portfolio',
  },
  'portfolio.description': {
    ru: 'Мои фотографии детских праздников, семейных встреч, юбилеев и фотосессий на природе для детей и взрослых',
    en: 'My photos of children\'s parties, family gatherings, anniversaries and outdoor photoshoots for children and adults',
  },
  'portfolio.allWorks': {
    ru: 'Все работы',
    en: 'All Works',
  },
  'portfolio.events': {
    ru: 'Мероприятия',
    en: 'Events',
  },
  'portfolio.children': {
    ru: 'Детская съемка',
    en: 'Children',
  },
  'portfolio.portraits': {
    ru: 'Портреты',
    en: 'Portraits',
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
    ru: 'Я специализируюсь на съемке детских праздников, семейных встреч, юбилеев и провожу фотосессии на природе как для детей, так и для взрослых. Всегда открыт для новых идей и творческих экспериментов!',
    en: 'I specialize in photographing children\'s parties, family gatherings, anniversaries, and I conduct outdoor photoshoots for both children and adults. Always open to new ideas and creative experiments!',
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
  'contact.form.name': {
    ru: 'Имя*',
    en: 'Name*',
  },
  'contact.form.email': {
    ru: 'Email*',
    en: 'Email*',
  },
  'contact.form.subject': {
    ru: 'Тема*',
    en: 'Subject*',
  },
  'contact.form.message': {
    ru: 'Сообщение*',
    en: 'Message*',
  },
  'contact.form.submit': {
    ru: 'Отправить сообщение',
    en: 'Send Message',
  },
  'contact.form.success': {
    ru: 'Спасибо! Ваше сообщение отправлено.',
    en: 'Thank you! Your message has been sent.',
  },
  'contact.form.error': {
    ru: 'Произошла ошибка. Пожалуйста, попробуйте снова позже.',
    en: 'An error occurred. Please try again later.',
  },
  
  // Footer
  'footer.copyright': {
    ru: '© 2023 Сергей Технерядов. Все права защищены',
    en: '© 2023 Sergey Tekneryad. All rights reserved',
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
