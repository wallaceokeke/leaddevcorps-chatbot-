import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { Bot, User, Clock } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  onActionClick: (action: string, data?: any) => void;
}

export function ChatMessage({ message, onActionClick }: ChatMessageProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg' : 'bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-4 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-md shadow-lg' 
            : 'bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-bl-md shadow-lg text-gray-100'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        
        {message.actions && message.actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <button
                key={action.id}
                onClick={() => onActionClick(action.action, action.data)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  action.type === 'primary'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-lg'
                    : 'bg-gray-600/50 text-gray-200 hover:bg-gray-500/50 border border-gray-500/50 backdrop-blur-sm'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
        
        <div className={`mt-2 flex items-center gap-1 text-xs text-gray-400 ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <Clock className="w-3 h-3 text-blue-400" />
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}