import { config, validateConfig } from './config';
import emailjs from 'emailjs-com';

// Проверка конфигурации и вывод информации о статусе
console.log('EmailJS Config Status:', validateConfig() ? 'Валидно' : 'Невалидно');

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
    // Проверяем наличие всех необходимых ключей и выводим диагностику
    console.log('Проверка ключей EmailJS:', { 
      serviceId: config.emailjs.serviceId ? 'Установлен' : 'Не установлен', 
      templateId: config.emailjs.templateId ? 'Установлен' : 'Не установлен', 
      userId: config.emailjs.userId ? 'Установлен' : 'Не установлен' 
    });
    
    if (!config.emailjs.serviceId || !config.emailjs.templateId || !config.emailjs.userId) {
      console.error('Отсутствуют необходимые ключи EmailJS');
      throw new Error('Не все ключи EmailJS настроены');
    }
    
    // Создаем шаблон для отправки
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    };
    
    console.log('Отправка email через EmailJS...', { ...templateParams, message: `${data.message.substring(0, 20)}...` });
    
    // Отправляем без предварительной инициализации
    try {
      const response = await emailjs.send(
        config.emailjs.serviceId,
        config.emailjs.templateId,
        templateParams,
        config.emailjs.userId // Передаем userId напрямую
      );
      
      console.log('Успешно отправлено:', response);
      return true;
    } catch (sendError: any) {
      // Детальная диагностика ошибки отправки
      console.error('Ошибка EmailJS.send:', sendError);
      if (sendError?.text) {
        console.error('Текст ошибки EmailJS:', sendError.text);
      }
      throw new Error(`Ошибка сервиса EmailJS: ${sendError?.text || sendError?.message || 'Неизвестная ошибка'}`);
    }
  } catch (error: any) {
    console.error('Ошибка отправки email:', error);
    
    // Формируем понятное сообщение об ошибке для пользователя
    if (error instanceof Error) {
      console.error(`Детали ошибки: ${error.message}`, error.stack);
    }
    
    throw error; // Проброс ошибки дальше для обработки в компоненте
  }
};