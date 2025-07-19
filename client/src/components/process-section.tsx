import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

export function ProcessSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const steps = [
    t.process.steps.needs,
    t.process.steps.search,
    t.process.steps.presentation,
    t.process.steps.documentation,
    t.process.steps.logistics,
    t.process.steps.training,
    t.process.steps.work,
    t.process.steps.management,
    t.process.steps.quality,
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">{t.process.title}</h2>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            {t.process.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dark-gray">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
