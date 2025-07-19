import { Header } from '@/components/header';
import { EnhancedFooter } from '@/components/enhanced-footer';
import { AnimatedBackground } from '@/components/animated-background';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Users, Search, Handshake, Clock, CheckCircle, TrendingUp } from 'lucide-react';

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language];

  const services = [
    {
      icon: Users,
      title: t.services.workforce.title,
      description: t.services.workforce.description,
      features: [
        'Временный персонал',
        'Сезонные работники',
        'Замещающий персонал',
        'Срочные проекты'
      ],
      color: 'bg-primary-blue'
    },
    {
      icon: Search,
      title: t.services.recruiting.title,
      description: t.services.recruiting.description,
      features: [
        'Поиск кандидатов',
        'Собеседования',
        'Проверка квалификации',
        'Гарантийное сопровождение'
      ],
      color: 'bg-primary-green'
    },
    {
      icon: Handshake,
      title: t.services.mediation.title,
      description: t.services.mediation.description,
      features: [
        'Партнерская сеть',
        'Быстрое размещение',
        'Гибкие условия',
        'Качественный отбор'
      ],
      color: 'bg-primary-yellow'
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Быстрое реагирование',
      description: 'Оперативное решение ваших кадровых задач в кратчайшие сроки'
    },
    {
      icon: CheckCircle,
      title: 'Гарантия качества',
      description: 'Проверенные специалисты с подтвержденной квалификацией'
    },
    {
      icon: TrendingUp,
      title: 'Эффективность',
      description: 'Оптимизация затрат на персонал и повышение производительности'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
              {t.services.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light text-black">
              {t.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:border-primary-blue/20 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black text-center">{service.title}</h3>
                  <p className="text-black mb-6 text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-black">
                        <CheckCircle className="h-5 w-5 text-primary-green mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Преимущества работы с нами</h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Почему клиенты выбирают HireHand для решения кадровых задач
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center animate-bounce-in bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-blue/20 transition-all duration-300">
                <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black">{benefit.title}</h3>
                <p className="text-black">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

        <EnhancedFooter />
      </div>
    </div>
  );
}