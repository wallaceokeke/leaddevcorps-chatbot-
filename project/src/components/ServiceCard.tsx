import React from 'react';
import { Service } from '../types';
import { ArrowRight, Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onSelect: (serviceId: string) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const formatPrice = (pricing: Service['pricing']) => {
    if (pricing.type === 'hourly') {
      return `$${pricing.amount}/hour`;
    }
    return `Starting at $${pricing.amount.toLocaleString()}`;
  };

  const getCategoryColor = (category: Service['category']) => {
    const colors = {
      development: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
      ai: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
      consulting: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
      infrastructure: 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getCategoryColor(service.category)}`}>
            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
          </span>
          <h3 className="text-lg font-semibold text-white mt-2">{service.name}</h3>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>
      
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>{service.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-cyan-400" />
          <span>{formatPrice(service.pricing)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              {feature}
            </li>
          ))}
          {service.features.length > 3 && (
            <li className="text-gray-500">+{service.features.length - 3} more features</li>
          )}
        </ul>
      </div>
      
      <button
        onClick={() => onSelect(service.id)}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium shadow-lg"
      >
        Learn More & Get Quote
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}