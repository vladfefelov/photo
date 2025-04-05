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
    ru: 'Фотограф-художник, запечатляющий подлинные эмоции и искренние моменты',
    en: 'Artistic photographer, capturing genuine emotions and authentic moments',
  },
  'hero.button': {
    ru: 'Исследовать',
    en: 'Explore',
  },
  
  // Portfolio Section
  'portfolio.title': {
    ru: 'Портфолио',
    en: 'Portfolio',
  },
  'portfolio.description': {
    ru: 'Коллекция избранных работ, отражающих мой уникальный художественный взгляд и тонкое внимание к деталям',
    en: 'A collection of selected works that reflect my unique artistic vision and careful attention to detail',
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
    ru: 'Привет! Меня зовут Сергей Технерядов, я профессиональный фотограф из живописного города Петропавловск, Казахстан.',
    en: 'Hello! My name is Sergey Tekneryad, I am a professional photographer from the picturesque city of Petropavlovsk, Kazakhstan.',
  },
  'about.bio2': {
    ru: 'Уже более 7 лет я создаю визуальные истории, которые отражают подлинную сущность моментов и людей. Моя философия заключается в том, что каждая фотография — это не просто изображение, а эмоциональная история, заключенная в кадре.',
    en: 'For over 7 years, I have been creating visual stories that reflect the true essence of moments and people. My philosophy is that each photograph is not just an image, but an emotional story captured in a frame.',
  },
  'about.bio3': {
    ru: 'Я специализируюсь на съемке мероприятий, портретов и детских фотосессий, но всегда открыт для творческих коллабораций и новых идей.',
    en: 'I specialize in event photography, portraits, and children\'s photoshoots, but I am always open to creative collaborations and new ideas.',
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
