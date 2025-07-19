import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Quote, Building } from 'lucide-react';

export function TestimonialsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-16 lg:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">{t.testimonials.title}</h2>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-8 md:p-12 max-w-4xl mx-auto text-center shadow-lg">
          <div className="mb-6">
            <Quote className="h-12 w-12 text-primary-blue mx-auto" />
          </div>
          <blockquote className="text-xl md:text-2xl text-dark-gray mb-6 font-light italic">
            "{t.testimonials.quote}"
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mr-4">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-dark-gray">{t.testimonials.company}</div>
              <div className="text-medium-gray text-sm">{t.testimonials.type}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
