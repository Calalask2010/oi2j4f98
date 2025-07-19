import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { 
  Factory, 
  Truck, 
  HardHat, 
  Warehouse, 
  Sparkles, 
  Bed, 
  Sprout, 
  UtensilsCrossed, 
  Heart 
} from 'lucide-react';

export function IndustriesSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const industries = [
    { icon: Factory, title: t.industries.list.manufacturing },
    { icon: Truck, title: t.industries.list.logistics },
    { icon: HardHat, title: t.industries.list.construction },
    { icon: Warehouse, title: t.industries.list.warehouse },
    { icon: Sparkles, title: t.industries.list.cleaning },
    { icon: Bed, title: t.industries.list.hospitality },
    { icon: Sprout, title: t.industries.list.agriculture },
    { icon: UtensilsCrossed, title: t.industries.list.catering },
    { icon: Heart, title: t.industries.list.healthcare },
  ];

  return (
    <section className="py-16 lg:py-24 bg-light-gray/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t.industries.title}</h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            {t.industries.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div key={index} 
                 className="bg-white/90 backdrop-blur-sm rounded-lg p-6 flex items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up group"
                 style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <industry.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-black font-medium group-hover:text-primary-blue transition-colors duration-300">{industry.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
