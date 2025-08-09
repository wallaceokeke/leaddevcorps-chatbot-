import { UserIntent } from '../types';

const serviceKeywords = {
  'custom-software': ['custom software', 'bespoke', 'tailored solution', 'enterprise software'],
  'ai-solutions': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatbot', 'nlp', 'computer vision'],
  'web-development': ['website', 'web app', 'web development', 'frontend', 'backend', 'full stack'],
  'mobile-development': ['mobile app', 'ios', 'android', 'react native', 'flutter', 'mobile development'],
  'cloud-infrastructure': ['cloud', 'aws', 'azure', 'gcp', 'devops', 'infrastructure', 'deployment'],
  'tech-consulting': ['consulting', 'strategy', 'architecture', 'technical advice', 'code review']
};

const intentKeywords = {
  service_inquiry: ['what services', 'what do you offer', 'capabilities', 'solutions', 'development'],
  pricing: ['price', 'cost', 'budget', 'how much', 'pricing', 'quote', 'estimate'],
  booking: ['book', 'schedule', 'appointment', 'meeting', 'consultation', 'hire', 'start project'],
  contact: ['contact', 'reach out', 'get in touch', 'speak to', 'call', 'email'],
  general: ['about', 'company', 'team', 'experience', 'portfolio', 'clients']
};

export function analyzeUserIntent(message: string): UserIntent {
  const lowerMessage = message.toLowerCase();
  
  // Determine primary intent
  let primaryIntent: UserIntent['type'] = 'general';
  let maxScore = 0;
  
  Object.entries(intentKeywords).forEach(([intent, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (lowerMessage.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > maxScore) {
      maxScore = score;
      primaryIntent = intent as UserIntent['type'];
    }
  });
  
  // Extract service entities
  const serviceEntities: string[] = [];
  Object.entries(serviceKeywords).forEach(([serviceId, keywords]) => {
    const hasKeyword = keywords.some(keyword => lowerMessage.includes(keyword));
    if (hasKeyword) {
      serviceEntities.push(serviceId);
    }
  });
  
  // Calculate confidence based on keyword matches
  const confidence = Math.min(0.9, (maxScore + serviceEntities.length) * 0.2 + 0.3);
  
  return {
    type: primaryIntent,
    confidence,
    entities: {
      services: serviceEntities,
      hasUrgency: /urgent|asap|quickly|soon/.test(lowerMessage),
      hasBudget: /budget|cost|price/.test(lowerMessage)
    }
  };
}

export function generateResponse(intent: UserIntent, message: string): string {
  const { type, entities } = intent;
  
  switch (type) {
    case 'service_inquiry':
      if (entities.services?.length > 0) {
        return `I'd be happy to tell you about our ${entities.services.join(' and ')} services! We specialize in cutting-edge technology solutions. Would you like detailed information about any specific service, or shall I provide an overview of our capabilities?`;
      }
      return `LeadDevCorps offers comprehensive technology solutions including custom software development, AI/ML solutions, web and mobile applications, cloud infrastructure, and strategic technology consulting. Which area interests you most?`;
    
    case 'pricing':
      return `Our pricing varies based on project scope and requirements. We offer competitive rates with transparent pricing models. Would you like me to provide a detailed quote for a specific service? I can also schedule a consultation to discuss your budget and requirements.`;
    
    case 'booking':
      return `I'd be delighted to help you get started! Let me gather some information to connect you with the right specialist and provide an accurate timeline and quote.`;
    
    case 'contact':
      return `You can reach our team directly at okekewallace@gmail.com or through this chat. I can also schedule a consultation call with one of our technical specialists. What would work best for you?`;
    
    case 'general':
      return `LeadDevCorps is a leading AI systems development company specializing in innovative technology solutions. We help businesses transform through custom software, AI integration, and strategic technology consulting. Founded with a mission to deliver cutting-edge solutions that drive real business value. How can we help transform your business?`;
    
    default:
      return `I'm here to help you learn about LeadDevCorps' services and how we can support your technology needs. What specific information are you looking for?`;
  }
}

export function generateDetailedServiceResponse(service: any): string {
  const pricingText = service.pricing.type === 'hourly' 
    ? `$${service.pricing.amount}/hour` 
    : `starting at $${service.pricing.amount.toLocaleString()}`;

  let response = `## ${service.name}\n\n`;
  response += `${service.description}\n\n`;
  response += `**💰 Investment:** ${pricingText}\n`;
  response += `**⏱️ Timeline:** ${service.duration}\n\n`;
  response += `**🚀 What's Included:**\n`;
  
  service.features.forEach((feature: string, index: number) => {
    response += `• ${feature}\n`;
  });
  
  response += `\n**Why Choose This Service?**\n`;
  
  switch (service.category) {
    case 'development':
      response += `Our development team uses cutting-edge technologies and follows industry best practices to deliver scalable, maintainable solutions. We provide full project transparency with regular updates and demos.`;
      break;
    case 'ai':
      response += `We leverage the latest AI/ML frameworks and have deep expertise in neural networks, deep learning, and natural language processing. Our AI solutions are designed to provide measurable business value and ROI.`;
      break;
    case 'consulting':
      response += `Our senior consultants have 10+ years of experience helping companies navigate complex technical challenges. We provide actionable insights and strategic roadmaps tailored to your business goals.`;
      break;
    case 'infrastructure':
      response += `We specialize in cloud-native architectures and DevOps best practices. Our infrastructure solutions are designed for scalability, security, and cost-effectiveness.`;
      break;
  }
  
  response += `\n\n**Next Steps:**\nI can connect you with one of our specialists for a detailed consultation where we'll discuss your specific requirements and provide a customized proposal. Would you like to schedule a call?`;
  
  return response;
}

export function generateCustomizationResponse(service: any): string {
  let response = `Excellent! Let me help you customize the ${service.name} package to perfectly fit your needs.\n\n`;
  response += `**Customization Options Available:**\n\n`;
  
  switch (service.category) {
    case 'development':
      response += `• **Technology Stack:** Choose from React/Vue/Angular, Node.js/Python/Java, PostgreSQL/MongoDB\n`;
      response += `• **Integrations:** Third-party APIs, payment gateways, CRM systems\n`;
      response += `• **Deployment:** Cloud platform preference (AWS/Azure/GCP)\n`;
      response += `• **Team Size:** Scale team based on timeline requirements\n`;
      response += `• **Support Level:** Choose from basic, standard, or premium support packages\n`;
      break;
    case 'ai':
      response += `• **AI Models:** Custom training vs pre-trained model fine-tuning\n`;
      response += `• **Data Sources:** Integration with your existing data systems\n`;
      response += `• **Deployment:** Cloud, on-premise, or hybrid solutions\n`;
      response += `• **Performance:** Accuracy vs speed optimization preferences\n`;
      response += `• **Compliance:** GDPR, HIPAA, or other regulatory requirements\n`;
      break;
    case 'consulting':
      response += `• **Focus Areas:** Architecture, security, performance, or team training\n`;
      response += `• **Engagement Model:** On-site, remote, or hybrid consulting\n`;
      response += `• **Duration:** Short-term assessment or long-term partnership\n`;
      response += `• **Deliverables:** Reports, documentation, training materials\n`;
      response += `• **Team Access:** Direct access to senior architects and specialists\n`;
      break;
    case 'infrastructure':
      response += `• **Cloud Provider:** AWS, Azure, GCP, or multi-cloud setup\n`;
      response += `• **Scalability:** Auto-scaling requirements and traffic patterns\n`;
      response += `• **Security:** Compliance requirements and security protocols\n`;
      response += `• **Monitoring:** Logging, alerting, and performance monitoring tools\n`;
      response += `• **Backup & Recovery:** Disaster recovery and data backup strategies\n`;
      break;
  }
  
  response += `\n**Pricing Flexibility:**\n`;
  response += `We offer flexible pricing models including fixed-price projects, time & materials, or retainer-based engagements. Our team will work with you to find the most cost-effective approach for your budget and timeline.\n\n`;
  response += `Let's schedule a consultation to discuss your specific requirements and create a tailored proposal that perfectly matches your needs and budget.`;
  
  return response;
}