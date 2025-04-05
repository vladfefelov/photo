import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MessageSquare, Send, AlertCircle } from "lucide-react";
import { i18n } from "@/lib/i18n";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { sendEmail, type EmailData } from "@/lib/emailService";
import { config } from "@/lib/config";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message is too short" }),
});

type FormData = z.infer<typeof formSchema>;

// Компонент диагностики для отображения состояния EmailJS
function EmailJSDebug() {
  const [status, setStatus] = useState<{
    serviceId: boolean;
    templateId: boolean;
    userId: boolean;
    allConfigured: boolean;
  }>({
    serviceId: false,
    templateId: false,
    userId: false,
    allConfigured: false
  });

  useEffect(() => {
    // Проверяем наличие конфигурации EmailJS и устанавливаем состояние
    const serviceId = !!config.emailjs.serviceId;
    const templateId = !!config.emailjs.templateId;
    const userId = !!config.emailjs.userId;
    
    setStatus({
      serviceId,
      templateId,
      userId,
      allConfigured: serviceId && templateId && userId
    });
    
    // Подробно выводим в консоль для диагностики
    console.log('EmailJS конфигурация:', {
      serviceId: serviceId ? `${config.emailjs.serviceId.substring(0, 3)}...` : 'не задан',
      templateId: templateId ? `${config.emailjs.templateId.substring(0, 3)}...` : 'не задан',
      userId: userId ? `${config.emailjs.userId.substring(0, 3)}...` : 'не задан',
    });
  }, []);

  // Не отображаем в production
  if (import.meta.env.PROD) return null;

  return (
    <div className="bg-black border border-amber-600 rounded p-3 mb-4 text-sm">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="text-amber-500" size={16} />
        <h3 className="text-amber-500 font-medium">EmailJS Диагностика</h3>
      </div>
      <ul className="space-y-1 text-xs">
        <li className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${status.serviceId ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>Service ID: {status.serviceId ? 'настроен' : 'не настроен'}</span>
        </li>
        <li className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${status.templateId ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>Template ID: {status.templateId ? 'настроен' : 'не настроен'}</span>
        </li>
        <li className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${status.userId ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>User ID: {status.userId ? 'настроен' : 'не настроен'}</span>
        </li>
      </ul>
    </div>
  );
}

export default function ContactForm() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Выводим в консоль информацию о данных для отладки
      console.log("Пытаемся отправить письмо с данными:", data);
      
      const success = await sendEmail({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      });
      
      if (success) {
        toast({
          title: i18n.translate("contact.form.success"),
          variant: "default",
        });
        reset();
      } else {
        throw new Error("Не удалось отправить email");
      }
    } catch (error) {
      // Показываем подробную информацию об ошибке в консоли
      console.error("Ошибка формы обратной связи:", error);
      
      // Если есть сообщение ошибки - показываем его пользователю
      let errorMessage = i18n.translate("contact.form.error");
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error("Детали ошибки:", error.stack);
      }
      
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-black"
      ref={ref as any}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Contact Information */}
            <motion.div 
              className="md:col-span-2"
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
            >
              <div className="space-y-8">
                <motion.div variants={fadeUp}>
                  <h4 className="text-accent mb-2 font-display text-lg">
                    {i18n.translate("contact.address")}
                  </h4>
                  <p className="text-gray-300 whitespace-pre-line">
                    {i18n.translate("contact.location")}
                  </p>
                </motion.div>
                
                <motion.div variants={fadeUp}>
                  <h4 className="text-accent mb-2 font-display text-lg">
                    {i18n.translate("contact.contactInfo")}
                  </h4>
                  <p className="text-gray-300">
                    <a 
                      href="mailto:tehnichka.migelya@gmail.com" 
                      className="hover:text-accent transition-colors block mb-1"
                    >
                      tehnichka.migelya@gmail.com
                    </a>
                    <a 
                      href="tel:+77478225648" 
                      className="hover:text-accent transition-colors block"
                    >
                      +7 (747) 822-5648
                    </a>
                  </p>
                </motion.div>
                
                <motion.div variants={fadeUp}>
                  <h4 className="text-accent mb-2 font-display text-lg">
                    {i18n.translate("contact.socialMedia")}
                  </h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://wa.me/37258391846" 
                      className="text-gray-300 hover:text-accent transition-colors"
                      aria-label="WhatsApp"
                    >
                      <MessageSquare size={20} />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="md:col-span-3"
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
            >
              {/* Диагностический блок для разработчика */}
              <EmailJSDebug />
              
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-300 mb-2">
                      {i18n.translate("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={`w-full bg-[#1c1c1c] border ${
                        errors.name ? "border-red-500" : "border-[#333333]"
                      } px-4 py-3 text-white rounded-lg focus:border-accent focus:outline-none transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
                      {i18n.translate("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full bg-[#1c1c1c] border ${
                        errors.email ? "border-red-500" : "border-[#333333]"
                      } px-4 py-3 text-white rounded-lg focus:border-accent focus:outline-none transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-300 mb-2">
                    {i18n.translate("contact.form.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    className={`w-full bg-[#1c1c1c] border ${
                      errors.subject ? "border-red-500" : "border-[#333333]"
                    } px-4 py-3 text-white rounded-lg focus:border-accent focus:outline-none transition-colors`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-300 mb-2">
                    {i18n.translate("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className={`w-full bg-[#1c1c1c] border ${
                      errors.message ? "border-red-500" : "border-[#333333]"
                    } px-4 py-3 text-white rounded-lg focus:border-accent focus:outline-none transition-colors resize-none`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-accent text-black hover:bg-[#e5c455] transition-colors font-medium rounded-lg text-sm flex items-center justify-center disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></span>
                        <span>{i18n.translate("contact.form.submit")}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        <span>{i18n.translate("contact.form.submit")}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
