import emailjs from 'emailjs-com';
import { config, validateConfig } from './config';

// Проверка конфигурации и вывод информации о статусе
console.log('EmailJS Config Status:', validateConfig() ? 'Валидно' : 'Невалидно');

// Инициализация EmailJS
if (config.emailjs.userId) {
  emailjs.init(config.emailjs.userId);
} else {
  console.error('VITE_EMAILJS_USER_ID не установлен');
}

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Отправляет email с данными формы
 * @param data Данные формы обратной связи
 * @returns Promise с результатом отправки
 */
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // Проверяем наличие всех необходимых ключей
    if (!validateConfig()) {
      throw new Error('Не настроены ключи EmailJS');
    }
    
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    };
    
    console.log('Отправка email через EmailJS...');
    
    // Для отладки
    console.log('Используемые ключи:', {
      serviceId: config.emailjs.serviceId,
      templateId: config.emailjs.templateId,
      userId: config.emailjs.userId ? 'Установлен' : 'Не установлен'
    });
    
    const response = await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      templateParams
    );
    
    console.log('Успешно отправлено:', response);
    return true;
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return false;
  }
};