// Конфигурация для внешних сервисов
export const config = {
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
    userId: import.meta.env.VITE_EMAILJS_USER_ID as string
  }
};

// Проверка наличия необходимых переменных окружения
export const validateConfig = () => {
  const missingVars = [];
  
  if (!config.emailjs.serviceId) missingVars.push('VITE_EMAILJS_SERVICE_ID');
  if (!config.emailjs.templateId) missingVars.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!config.emailjs.userId) missingVars.push('VITE_EMAILJS_USER_ID');
  
  if (missingVars.length > 0) {
    console.error(`Отсутствуют переменные окружения: ${missingVars.join(', ')}`);
    return false;
  }
  
  return true;
};