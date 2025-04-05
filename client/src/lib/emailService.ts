import emailjs from 'emailjs-com';

// Инициализация EmailJS
emailjs.init(import.meta.env.EMAILJS_USER_ID || '');

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
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    };
    
    await emailjs.send(
      import.meta.env.EMAILJS_SERVICE_ID || '',
      import.meta.env.EMAILJS_TEMPLATE_ID || '',
      templateParams
    );
    
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};