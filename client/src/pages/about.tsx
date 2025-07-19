import { Header } from '@/components/header';
import { EnhancedFooter } from '@/components/enhanced-footer';
import { AnimatedBackground } from '@/components/animated-background';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Award, Users, Globe, Clock, TrendingUp, Heart } from 'lucide-react';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];

  const stats = [
    {
      number: '500+',
      label: 'Довольных клиентов',
      icon: Heart
    },
    {
      number: '5000+',
      label: 'Размещенных специалистов',
      icon: Users
    },
    {
      number: '10+',
      label: 'Лет опыта',
      icon: Clock
    },
    {
      number: '99%',
      label: 'Успешных проектов',
      icon: TrendingUp
    }
  ];

  const values = [
    {
      icon: Award,
      title: 'Профессионализм',
      description: 'Высокие стандарты качества и профессиональный подход к каждому проекту'
    },
    {
      icon: Users,
      title: 'Индивидуальный подход',
      description: 'Персональные решения для каждого клиента с учетом специфики бизнеса'
    },
    {
      icon: Globe,
      title: 'Международный опыт',
      description: 'Работа с международными компаниями и понимание глобальных стандартов'
    },
    {
      icon: Clock,
      title: 'Оперативность',
      description: 'Быстрое реагирование на запросы и своевременное выполнение обязательств'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        {/* Geometric decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200/40 rounded-2xl rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-green-200/40 rounded-xl -rotate-12 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-200/40 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-indigo-200/40 rounded-lg rotate-12 animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-cyan-200/40 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                Профессиональные кадровые решения
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              О компании <span className="text-blue-600">HireHand</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto font-light text-gray-700 leading-relaxed">
              Мы объединяем талантливых специалистов с лучшими работодателями, 
              создавая успешные карьеры и процветающий бизнес
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <span className="text-blue-600 font-semibold">10+ лет опыта</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <span className="text-green-600 font-semibold">5000+ размещений</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <span className="text-purple-600 font-semibold">500+ клиентов</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-blue-100/50 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-100/50 rounded-2xl rotate-45"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                  Наша история
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Более 10 лет успешной работы в сфере HR
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Основание компании</h4>
                    <p className="text-gray-700">
                      HireHand OÜ была основана с целью предоставления качественных кадровых решений 
                      для растущего бизнеса в Эстонии и соседних странах.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Развитие экспертизы</h4>
                    <p className="text-gray-700">
                      Мы сформировали команду профессионалов с глубоким пониманием потребностей 
                      современного бизнеса и тенденций рынка труда.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Лидерство на рынке</h4>
                    <p className="text-gray-700">
                      Сегодня мы являемся надежным партнером для сотен компаний, 
                      обеспечивая качественный подбор персонала и эффективные решения.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-bounce-in">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Наша миссия</h3>
                </div>
                <p className="text-lg mb-8 text-gray-800 text-center leading-relaxed">
                  Обеспечить каждую компанию качественными кадровыми решениями, 
                  способствуя их росту и процветанию в современной экономике.
                </p>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Наше видение</h3>
                </div>
                <p className="text-lg text-gray-800 text-center leading-relaxed">
                  Стать ведущей кадровой компанией в регионе, известной своим 
                  профессионализмом, инновационным подходом и заботой о клиентах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-green-200/40 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-200/40 rounded-2xl rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Наши услуги
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Комплексные решения для вашего бизнеса
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Мы предлагаем полный спектр кадровых услуг для компаний любого размера
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Аренда персонала</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Предоставляем квалифицированных специалистов для временных и постоянных проектов
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Подбор кадров</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Профессиональный рекрутинг и подбор персонала для различных отраслей
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Трудовое посредничество</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Обеспечиваем связь между работодателями и соискателями по всей Европе
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-bounce-in bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-16 right-16 w-24 h-24 bg-pink-100/50 rounded-full"></div>
        <div className="absolute bottom-16 left-16 w-20 h-20 bg-cyan-100/50 rounded-2xl rotate-12"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Наши принципы
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ценности, которые нас определяют
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Мы строим долгосрочные отношения, основанные на доверии и взаимном уважении
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <div key={index} className="text-center animate-slide-up bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Команда профессионалов
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Наша команда состоит из опытных HR-специалистов, рекрутеров и консультантов, 
              которые понимают потребности современного бизнеса и помогают находить идеальные 
              решения для каждого клиента. Мы используем современные технологии и проверенные 
              методики для достижения лучших результатов.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/80 px-6 py-3 rounded-full shadow-md">
                <span className="text-blue-600 font-semibold">Сертифицированные рекрутеры</span>
              </div>
              <div className="bg-white/80 px-6 py-3 rounded-full shadow-md">
                <span className="text-green-600 font-semibold">Знание рынка труда</span>
              </div>
              <div className="bg-white/80 px-6 py-3 rounded-full shadow-md">
                <span className="text-purple-600 font-semibold">Индивидуальный подход</span>
              </div>
            </div>
          </div>
        </div>
      </section>

        <EnhancedFooter />
      </div>
    </div>
  );
}