import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Instagram, Facebook, MessageSquare, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { i18n } from "@/lib/i18n";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message is too short" }),
});

type FormData = z.infer<typeof formSchema>;

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
      const response = await apiRequest("POST", "/api/contact", data);
      if (response.ok) {
        toast({
          title: i18n.translate("contact.form.success"),
          variant: "default",
        });
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: i18n.translate("contact.form.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-neutral"
      ref={ref as any}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            <motion.h2 
              className="font-display text-3xl md:text-5xl mb-4"
              variants={fadeUp}
            >
              {i18n.translate("contact.title")}
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-xl mx-auto"
              variants={fadeUp}
            >
              {i18n.translate("contact.description")}
            </motion.p>
          </motion.div>
          
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
                      href="mailto:info@sergeyphotography.kz" 
                      className="hover:text-accent transition-colors block mb-1"
                    >
                      info@sergeyphotography.kz
                    </a>
                    <a 
                      href="tel:+77012345678" 
                      className="hover:text-accent transition-colors block"
                    >
                      +7 (701) 234-5678
                    </a>
                  </p>
                </motion.div>
                
                <motion.div variants={fadeUp}>
                  <h4 className="text-accent mb-2 font-display text-lg">
                    {i18n.translate("contact.socialMedia")}
                  </h4>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-accent transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-accent transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://wa.me/77012345678" 
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
                      className={`w-full bg-[#222222] border ${
                        errors.name ? "border-red-500" : "border-[#333333]"
                      } px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors`}
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
                      className={`w-full bg-[#222222] border ${
                        errors.email ? "border-red-500" : "border-[#333333]"
                      } px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors`}
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
                    className={`w-full bg-[#222222] border ${
                      errors.subject ? "border-red-500" : "border-[#333333]"
                    } px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors`}
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
                    className={`w-full bg-[#222222] border ${
                      errors.message ? "border-red-500" : "border-[#333333]"
                    } px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors resize-none`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-accent text-primary hover:bg-[#d6b890] transition-colors uppercase tracking-widest text-sm flex items-center justify-center disabled:opacity-70"
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
