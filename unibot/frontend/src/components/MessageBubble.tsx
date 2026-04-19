import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isBot = message.sender === 'bot';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex items-start gap-2 max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot 
            ? 'bg-primary-100 text-primary-600' 
            : 'bg-gray-200 text-gray-600'
        }`}>
          {isBot ? <Bot size={18} /> : <User size={18} />}
        </div>

        {/* Message Content */}
        <div className="flex flex-col">
          <div className={`relative px-4 py-3 rounded-2xl ${
            isBot 
              ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm' 
              : 'bg-primary-600 text-white rounded-tr-sm shadow-md'
          }`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.text}
            </p>
            
            {isBot && message.intent && message.intent !== 'unknown' && (
              <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
                <Sparkles size={12} className="text-primary-400" />
                <span className="text-xs text-gray-400 capitalize">
                  {message.intent.replace(/_/g, ' ')}
                </span>
              </div>
            )}
          </div>
          
          <span className={`text-xs text-gray-400 mt-1 ${isBot ? 'ml-1' : 'mr-1 text-right'}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
