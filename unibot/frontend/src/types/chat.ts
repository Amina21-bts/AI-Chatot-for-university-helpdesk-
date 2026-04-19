export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  intent?: string;
  confidence?: number;
}

export interface ChatResponse {
  response: string;
  intent: string;
  confidence: number;
  entities: Record<string, string>;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  user_id?: string;
}
