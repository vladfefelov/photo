import { createRoot } from "react-dom/client";
import { createServer, Request, Response } from "miragejs";
import App from "./App";
import "./index.css";

// Setup mock API if in development
if (process.env.NODE_ENV === "development") {
  createServer({
    routes() {
      this.namespace = "api";
      
      // Categories
      this.get("/categories", () => [
        { id: 1, name: "Все работы", slug: "all" },
        { id: 2, name: "Мероприятия", slug: "events" },
        { id: 3, name: "Детская съемка", slug: "children" },
        { id: 4, name: "Портреты", slug: "portraits" }
      ]);
      
      // Portfolio items
      this.get("/portfolio", () => [
        {
          id: 1,
          title: "Корпоративное событие",
          description: "Ежегодная конференция IT-компании",
          imageUrl: "https://images.unsplash.com/photo-1525286335722-c30c6b5dfee3?auto=format&fit=crop&q=80&w=800&h=1000",
          categoryId: 2,
          order: 1
        },
        {
          id: 2,
          title: "Художественный портрет",
          description: "Творческая студийная съемка",
          imageUrl: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=800&h=1200",
          categoryId: 4,
          order: 1
        },
        {
          id: 3,
          title: "Детский портрет",
          description: "Естественная съемка на природе",
          imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b40?auto=format&fit=crop&q=80&w=800&h=1000",
          categoryId: 3,
          order: 1
        },
        {
          id: 4,
          title: "Свадебная съемка",
          description: "Июнь 2023, Петропавловск",
          imageUrl: "https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?auto=format&fit=crop&q=80&w=800&h=1000",
          categoryId: 2,
          order: 2
        },
        {
          id: 5,
          title: "Мужской портрет",
          description: "Деловая фотосессия",
          imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800&h=1000",
          categoryId: 4,
          order: 2
        },
        {
          id: 6,
          title: "Семейная съемка",
          description: "Домашняя фотосессия",
          imageUrl: "https://images.unsplash.com/photo-1592711938300-d5568409702e?auto=format&fit=crop&q=80&w=800&h=1000",
          categoryId: 3,
          order: 2
        }
      ]);
      
      // Testimonials
      this.get("/testimonials", () => [
        {
          id: 1,
          name: "Анна и Михаил",
          role: "Свадебная фотосессия",
          content: "Сергей создал потрясающую атмосферу во время съемки. Фотографии получились естественными и живыми, именно такими, как мы хотели.",
          order: 1
        },
        {
          id: 2,
          name: "Екатерина",
          role: "Детская фотосессия",
          content: "Профессионал своего дела! Сергей умеет найти подход к детям — наша дочь обычно стесняется фотографов, но с ним чувствовала себя комфортно.",
          order: 2
        },
        {
          id: 3,
          name: "Алексей",
          role: "Директор IT-компании",
          content: "Сергей фотографировал наше корпоративное мероприятие. Результат превзошел все ожидания! Рекомендую для любых событий.",
          order: 3
        }
      ]);
      
      // Contact form submission
      this.post("/contact", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return {
          message: "Your message has been sent successfully",
          id: Math.floor(Math.random() * 1000)
        };
      });
    },
  });
}

createRoot(document.getElementById("root")!).render(<App />);
