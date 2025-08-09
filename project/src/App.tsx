import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ActionButton, UserIntent } from './types';
import { ChatMessage as ChatMessageComponent } from './components/ChatMessage';
import { ServicesGrid } from './components/ServicesGrid';
import { BookingForm } from './components/BookingForm';
import { analyzeUserIntent, generateResponse } from './utils/nlp';
import { getServiceById } from './data/services';
import { Bot, Send, Sparkles, Zap, Shield, Users } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Welcome to LeadDevCorps! 👋 I'm your AI assistant, here to help you discover our cutting-edge technology solutions.

We specialize in:
• Custom Software Development
• AI & Machine Learning Solutions  
• Web & Mobile Applications
• Cloud Infrastructure & DevOps
• Strategic Technology Consulting

How can I help transform your business today?`,
      timestamp: new Date(),
      actions: [
        { id: 'services', label: 'View All Services', type: 'primary', action: 'show_services' },
        { id: 'consultation', label: 'Book Consultation', type: 'secondary', action: 'book_consultation' }
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: 'user' | 'assistant', actions?: ActionButton[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      actions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage(userMessage, 'user');
    
    setIsTyping(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const intent = analyzeUserIntent(userMessage);
    const response = generateResponse(intent, userMessage);
    
    const actions: ActionButton[] = [];
    
    if (intent.type === 'service_inquiry') {
      actions.push(
        { id: 'services', label: 'View All Services', type: 'primary', action: 'show_services' },
        { id: 'consultation', label: 'Get Custom Quote', type: 'secondary', action: 'book_consultation' }
      );
    } else if (intent.type === 'pricing') {
      actions.push(
        { id: 'quote', label: 'Get Detailed Quote', type: 'primary', action: 'book_consultation' },
        { id: 'services', label: 'Browse Services', type: 'secondary', action: 'show_services' }
      );
    } else if (intent.type === 'booking') {
      actions.push(
        { id: 'book', label: 'Start Booking Process', type: 'primary', action: 'book_consultation' }
      );
    }
    
    setIsTyping(false);
    addMessage(response, 'assistant', actions);
  };

  const handleActionClick = (action: string, data?: any) => {
    switch (action) {
      case 'show_services':
        setShowServices(true);
        addMessage('Here are all our available services. Click on any service to learn more and get a customized quote.', 'assistant');
        break;
      case 'book_consultation':
        setShowBookingForm(true);
        break;
      case 'select_service':
        setSelectedService(data);
        const service = getServiceById(data);
        if (service) {
          // Add user message first
          addMessage(`Tell me more about ${service.name} and provide a detailed quote`, 'user');
          
          // Generate detailed AI response
          setTimeout(() => {
            const detailedResponse = generateDetailedServiceResponse(service);
            addMessage(detailedResponse, 'assistant', [
              { id: 'book', label: 'Book Consultation', type: 'primary', action: 'book_consultation' },
              { id: 'customize', label: 'Customize Quote', type: 'secondary', action: 'customize_quote', data: service.id }
            ]);
          }, 800);
        }
        break;
      case 'customize_quote':
        const customService = getServiceById(data);
        if (customService) {
          addMessage(`I'd like to customize the ${customService.name} package for my specific needs`, 'user');
          setTimeout(() => {
            const customResponse = generateCustomizationResponse(customService);
            addMessage(customResponse, 'assistant', [
              { id: 'book', label: 'Discuss Requirements', type: 'primary', action: 'book_consultation' }
            ]);
          }, 800);
        }
        break;
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    handleActionClick('select_service', serviceId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LeadDevCorps AI Assistant</h1>
                <p className="text-sm text-blue-300">Your Technology Solutions Partner</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <ChatMessageComponent
                key={message.id}
                message={message}
                onActionClick={handleActionClick}
              />
            ))}
            
            {showServices && (
              <div className="mt-6">
                <ServicesGrid onServiceSelect={handleServiceSelect} />
              </div>
            )}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl rounded-bl-md p-4 shadow-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="border-t border-gray-700/50 p-4 bg-gray-800/40">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services, pricing, or book a consultation..."
                className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Expert Team</span>
            </div>
            <span>•</span>
            <span>Contact: okekewallace@gmail.com</span>
            <span>•</span>
            <span>Response within 24 hours</span>
          </div>
          <p className="text-blue-300">Powered by LeadDevCorps AI Technology</p>
        </div>
      </div>
      
      {/* Booking Form Modal */}
      <BookingForm
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        selectedService={selectedService}
      />
    </div>
  );
}

export default App;
