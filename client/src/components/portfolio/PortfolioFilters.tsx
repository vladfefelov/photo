import { motion } from "framer-motion";
import { Category } from "@/lib/types";
import { i18n } from "@/lib/i18n";
import { fadeUp, staggerContainer } from "@/lib/animations";

type PortfolioFiltersProps = {
  categories: Category[];
  activeCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
};

export default function PortfolioFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: PortfolioFiltersProps) {
  return (
    <motion.div 
      className="flex flex-wrap justify-center mb-12 gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`px-5 py-2 border transition-all duration-300 uppercase tracking-widest text-xs ${
            (category.id === 1 && activeCategory === null) || 
            category.id === activeCategory
              ? "border-accent text-accent"
              : "border-gray-700 text-gray-300 hover:border-accent hover:text-accent"
          }`}
          onClick={() => onCategoryChange(category.id === 1 ? null : category.id)}
          variants={fadeUp}
        >
          {category.slug === "all" 
            ? i18n.translate("portfolio.allWorks")
            : category.slug === "events"
            ? i18n.translate("portfolio.events")
            : category.slug === "children"
            ? i18n.translate("portfolio.children")
            : category.slug === "portraits"
            ? i18n.translate("portfolio.portraits")
            : category.name
          }
        </motion.button>
      ))}
    </motion.div>
  );
}
