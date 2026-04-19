import { useState, useCallback, useRef } from 'react';
import { Message, ChatResponse } from '../types/chat';

const API_URL = 'http://localhost:8000';
const USER_ID = 'student_' + Math.random().toString(36).substr(2, 9);

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! I'm UniBot, your university helpdesk assistant. I can help with admissions, courses, fees, exams, library, hostel, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          user_id: USER_ID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data: ChatResponse = await response.json();

      const botMessage: Message = {
        id: generateId(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        intent: data.intent,
        confidence: data.confidence,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      const errorMessage: Message = {
        id: generateId(),
        text: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running on port 8000.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendSuggestion = useCallback((suggestion: string) => {
    sendMessage(suggestion);
  }, [sendMessage]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        text: "Chat cleared! How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    sendSuggestion,
    clearChat,
    messagesEndRef,
  };
}
