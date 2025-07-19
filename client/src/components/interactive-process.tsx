import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { 
  MessageSquare, 
  Search, 
  Users, 
  FileText, 
  Truck, 
  GraduationCap, 
  Play, 
  Settings, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export function InteractiveProcess() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: MessageSquare,
      title: t.process.steps.needs,
      description: 'Анализируем ваши потребности и требования к персоналу',
      details: 'Проводим детальную консультацию, изучаем специфику вашего бизнеса и определяем оптимальную стратегию подбора персонала.',
      color: 'bg-primary-blue'
    },
    {
      icon: Search,
      title: t.process.steps.search,
      description: 'Активный поиск кандидатов в нашей базе и внешних источниках',
      details: 'Используем современные методы поиска, включая социальные сети, профессиональные платформы и рекрутинговые базы данных.',
      color: 'bg-primary-green'
    },
    {
      icon: Users,
      title: t.process.steps.presentation,
      description: 'Представляем лучших кандидатов с полным досье',
      details: 'Предоставляем детальные профили кандидатов с результатами интервью, рекомендациями и оценкой соответствия требованиям.',
      color: 'bg-primary-yellow'
    },
    {
      icon: FileText,
      title: t.process.steps.documentation,
      description: 'Полное юридическое сопровождение и оформление',
      details: 'Берем на себя все документальные процедуры, включая трудовые договоры, разрешения на работу и визовые вопросы.',
      color: 'bg-primary-blue'
    },
    {
      icon: Truck,
      title: t.process.steps.logistics,
      description: 'Организация транспорта и размещения сотрудников',
      details: 'Обеспечиваем комфортную логистику: трансфер, размещение в качественном жилье и решение бытовых вопросов.',
      color: 'bg-primary-green'
    },
    {
      icon: GraduationCap,
      title: t.process.steps.training,
      description: 'Адаптация и обучение под ваши стандарты',
      details: 'Проводим необходимые инструктажи, обучение технике безопасности и адаптацию к корпоративным процедурам.',
      color: 'bg-primary-yellow'
    },
    {
      icon: Play,
      title: t.process.steps.work,
      description: 'Успешный старт работы с полным сопровождением',
      details: 'Обеспечиваем плавный переход к рабочему процессу с постоянной поддержкой и мониторингом эффективности.',
      color: 'bg-primary-blue'
    },
    {
      icon: Settings,
      title: t.process.steps.management,
      description: 'Управление персоналом и решение текущих задач',
      details: 'Оказываем постоянную поддержку в управлении командой, решении конфликтных ситуаций и оптимизации процессов.',
      color: 'bg-primary-green'
    },
    {
      icon: CheckCircle,
      title: t.process.steps.quality,
      description: 'Постоянный контроль результатов и улучшений',
      details: 'Регулярно оцениваем эффективность работы, собираем обратную связь и вносим необходимые корректировки.',
      color: 'bg-primary-yellow'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-light-gray/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 animate-fade-in">
            {t.process.title}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto animate-slide-up">
            {t.process.subtitle}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Steps Navigation */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg animate-slide-up ${
                  activeStep === index 
                    ? 'bg-white shadow-lg transform scale-105' 
                    : 'bg-white/80 hover:bg-white'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mr-4 transition-transform duration-300 ${
                  activeStep === index ? 'scale-110' : ''
                }`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black mb-1">{step.title}</h3>
                  <p className="text-black text-sm">{step.description}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-primary-blue mr-2">{index + 1}</span>
                  {activeStep === index && (
                    <ArrowRight className="h-5 w-5 text-primary-blue animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Active Step Details */}
          <div className="animate-fade-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className={`w-20 h-20 ${steps[activeStep].color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {(() => {
                  const IconComponent = steps[activeStep].icon;
                  return <IconComponent className="h-10 w-10 text-white" />;
                })()}
              </div>
              
              <h3 className="text-2xl font-bold text-black mb-4 text-center">
                Шаг {activeStep + 1}: {steps[activeStep].title}
              </h3>
              
              <p className="text-black text-center mb-6">
                {steps[activeStep].description}
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-black mb-3">Подробности:</h4>
                <p className="text-black leading-relaxed">
                  {steps[activeStep].details}
                </p>
              </div>
              
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeStep 
                          ? 'bg-primary-blue scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}