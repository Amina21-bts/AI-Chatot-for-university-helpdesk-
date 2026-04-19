import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface QuickRepliesProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const QuickReplies = ({ suggestions, onSuggestionClick }: QuickRepliesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="px-4 py-3"
    >
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare size={14} className="text-primary-500" />
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quick Questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 
                       rounded-full hover:bg-primary-100 hover:border-primary-300 transition-all duration-200
                       hover:shadow-sm active:scale-95"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickReplies;
