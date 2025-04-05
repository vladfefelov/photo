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
      className="flex flex-wrap justify-center mb-12 gap-3"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <div className="bg-secondary/80 backdrop-blur-sm p-1.5 rounded-full flex flex-wrap justify-center gap-1 border border-white/5">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
              (category.id === 1 && activeCategory === null) || 
              category.id === activeCategory
                ? "bg-primary text-white shadow-md"
                : "text-white/80 hover:bg-white/10"
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
      </div>
    </motion.div>
  );
}
