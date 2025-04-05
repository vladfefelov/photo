export type PortfolioItem = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  categoryId: number;
  order: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  content: string;
  order: number;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
