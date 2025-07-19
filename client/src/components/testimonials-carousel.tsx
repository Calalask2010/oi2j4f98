import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { ChevronLeft, ChevronRight, Star, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TestimonialsCarousel() {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Александр Петров',
      position: 'Директор по производству',
      company: 'Heavy Industry Estonia',
      type: 'Промышленная компания',
      rating: 5,
      text: 'Hire Hand OÜ отреагировало быстро и проявило гибкость при выполнении наших высоких требований. Качество подобранного персонала превзошло ожидания.',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Мария Козлова',
      position: 'HR-менеджер',
      company: 'Baltic Logistics',
      type: 'Логистическая компания',
      rating: 5,
      text: 'Отличная работа с подбором сезонных работников. Все кандидаты прошли тщательный отбор и показали высокую эффективность.',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'Андрей Смирнов',
      position: 'Управляющий директор',
      company: 'Construction Pro',
      type: 'Строительная компания',
      rating: 5,
      text: 'Сотрудничаем уже 3 года. HireHand всегда находит квалифицированных специалистов в кратчайшие сроки. Рекомендуем!',
      avatar: '👨‍🔧'
    },
    {
      id: 4,
      name: 'Елена Попова',
      position: 'Генеральный директор',
      company: 'Green Agriculture',
      type: 'Сельскохозяйственная компания',
      rating: 5,
      text: 'Благодаря HireHand мы успешно закрыли потребность в сезонных работниках. Профессиональный подход и качественный сервис.',
      avatar: '👩‍🌾'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-blue to-primary-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 animate-fade-in">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-black/90 max-w-3xl mx-auto animate-slide-up">
            {t.testimonials.subtitle}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl animate-bounce-in">
            <div className="flex items-center justify-center mb-6">
              <div className="text-6xl">{currentTestimonial.avatar}</div>
            </div>
            
            <div className="flex justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-primary-yellow fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl text-black mb-8 font-light italic text-center">
              "{currentTestimonial.text}"
            </blockquote>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Building className="h-5 w-5 text-primary-blue mr-2" />
                <span className="font-bold text-black text-lg">{currentTestimonial.name}</span>
              </div>
              <div className="text-black font-medium">{currentTestimonial.position}</div>
              <div className="text-primary-blue font-semibold">{currentTestimonial.company}</div>
              <div className="text-sm text-black">{currentTestimonial.type}</div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white text-white hover:bg-white hover:text-primary-blue transition-all duration-300 w-12 h-12 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white text-white hover:bg-white hover:text-primary-blue transition-all duration-300 w-12 h-12 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}