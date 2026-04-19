import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Send, Trash2, GraduationCap } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickReplies from './QuickReplies';

const QUICK_SUGGESTIONS = [
  "Admission requirements",
  "Fee structure", 
  "CS courses",
  "Exam schedule",
  "Library timing",
  "Hostel facilities",
  "Scholarships",
  "Transport service"
];

const ChatWindow = () => {
  const { messages, isLoading, sendMessage, sendSuggestion, clearChat, messagesEndRef } = useChat();
  const [inputText, setInputText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, messagesEndRef]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      sendMessage(inputText);
      setInputText('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendSuggestion(suggestion);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    clearChat();
    setShowSuggestions(true);
  };

  const shouldShowSuggestions = showSuggestions && messages.length === 1;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">UniBot</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500">Online - University Helpdesk</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleClear}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear chat"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto chat-scrollbar px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <GraduationCap size={18} />
                </div>
                <TypingIndicator />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Suggestions */}
      <AnimatePresence>
        {shouldShowSuggestions && (
          <div className="border-t border-gray-200 bg-white">
            <QuickReplies 
              suggestions={QUICK_SUGGESTIONS} 
              onSuggestionClick={handleSuggestionClick} 
            />
          </div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <footer className="flex-shrink-0 bg-white border-t border-gray-200 px-4 py-3">
        <form 
          onSubmit={handleSubmit}
          className="flex items-center gap-3 max-w-4xl mx-auto"
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about admissions, courses, fees, exams..."
              className="w-full px-4 py-3 pr-4 bg-gray-100 border-0 rounded-xl text-sm text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 
                         focus:bg-white transition-all"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`flex-shrink-0 p-3 rounded-xl transition-all duration-200 ${
              inputText.trim() && !isLoading
                ? 'bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-400 mt-2">
          UniBot uses AI to answer university queries. For official matters, contact administration.
        </p>
      </footer>
    </div>
  );
};

export default ChatWindow;
