import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Users, Search, Handshake } from 'lucide-react';

export function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const services = [
    {
      icon: Users,
      title: t.services.workforce.title,
      description: t.services.workforce.description,
    },
    {
      icon: Search,
      title: t.services.recruiting.title,
      description: t.services.recruiting.description,
    },
    {
      icon: Handshake,
      title: t.services.mediation.title,
      description: t.services.mediation.description,
    },
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t.services.title}</h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} 
                 className="bg-white/90 backdrop-blur-sm rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up group"
                 style={{ animationDelay: `${index * 200}ms` }}>
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black group-hover:text-primary-blue transition-colors duration-300">{service.title}</h3>
              <p className="text-black">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
