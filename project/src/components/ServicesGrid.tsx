import React from 'react';
import { services } from '../data/services';
import { ServiceCard } from './ServiceCard';

interface ServicesGridProps {
  onServiceSelect: (serviceId: string) => void;
}

export function ServicesGrid({ onServiceSelect }: ServicesGridProps) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
      <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={onServiceSelect}
          />
        ))}
      </div>
    </div>
  );
}