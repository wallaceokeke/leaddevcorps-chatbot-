export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'development' | 'ai' | 'consulting' | 'infrastructure';
  pricing: {
    type: 'fixed' | 'hourly' | 'project';
    amount: number;
    currency: string;
  };
  duration: string;
  features: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: ActionButton[];
}

export interface ActionButton {
  id: string;
  label: string;
  type: 'primary' | 'secondary';
  action: string;
  data?: any;
}

export interface UserIntent {
  type: 'service_inquiry' | 'pricing' | 'booking' | 'general' | 'contact';
  confidence: number;
  entities: Record<string, any>;
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  timeline: string;
}