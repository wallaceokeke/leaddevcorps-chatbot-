import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'custom-software',
    name: 'Custom Software Development',
    description: 'End-to-end custom software solutions tailored to your business needs',
    category: 'development',
    pricing: { type: 'project', amount: 15000, currency: 'USD' },
    duration: '8-16 weeks',
    features: [
      'Full-stack development',
      'Modern tech stack (React, Node.js, Python)',
      'Database design & optimization',
      'API development & integration',
      'Testing & quality assurance',
      '6 months post-launch support'
    ]
  },
  {
    id: 'ai-solutions',
    name: 'AI & Machine Learning Solutions',
    description: 'Intelligent systems powered by cutting-edge AI technology',
    category: 'ai',
    pricing: { type: 'project', amount: 25000, currency: 'USD' },
    duration: '12-20 weeks',
    features: [
      'Custom AI model development',
      'Natural Language Processing',
      'Computer Vision solutions',
      'Predictive analytics',
      'AI chatbots & virtual assistants',
      'MLOps & model deployment'
    ]
  },
  {
    id: 'web-development',
    name: 'Web Application Development',
    description: 'Responsive, scalable web applications with modern frameworks',
    category: 'development',
    pricing: { type: 'project', amount: 8000, currency: 'USD' },
    duration: '6-12 weeks',
    features: [
      'Responsive design',
      'Progressive Web App (PWA)',
      'SEO optimization',
      'Performance optimization',
      'Cross-browser compatibility',
      'Content management system'
    ]
  },
  {
    id: 'mobile-development',
    name: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications',
    category: 'development',
    pricing: { type: 'project', amount: 20000, currency: 'USD' },
    duration: '10-16 weeks',
    features: [
      'iOS & Android development',
      'React Native / Flutter',
      'App Store optimization',
      'Push notifications',
      'Offline functionality',
      'Analytics integration'
    ]
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud Infrastructure & DevOps',
    description: 'Scalable cloud solutions and automated deployment pipelines',
    category: 'infrastructure',
    pricing: { type: 'hourly', amount: 150, currency: 'USD' },
    duration: '4-8 weeks',
    features: [
      'AWS/Azure/GCP setup',
      'CI/CD pipeline implementation',
      'Container orchestration',
      'Monitoring & logging',
      'Security best practices',
      'Cost optimization'
    ]
  },
  {
    id: 'tech-consulting',
    name: 'Technology Consulting',
    description: 'Strategic technology guidance and architecture planning',
    category: 'consulting',
    pricing: { type: 'hourly', amount: 200, currency: 'USD' },
    duration: '2-6 weeks',
    features: [
      'Technology stack assessment',
      'Architecture design',
      'Digital transformation strategy',
      'Code review & optimization',
      'Team training & mentoring',
      'Technical due diligence'
    ]
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};