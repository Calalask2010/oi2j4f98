import { Header } from '@/components/header';
import { EnhancedFooter } from '@/components/enhanced-footer';
import { ContactSection } from '@/components/contact-section';
import { AnimatedBackground } from '@/components/animated-background';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Телефон',
      value: t.contact.phone,
      description: 'Звоните в рабочее время',
      color: 'bg-primary-blue'
    },
    {
      icon: Mail,
      title: 'Email',
      value: t.contact.email,
      description: 'Ответим в течение 24 часов',
      color: 'bg-primary-green'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      value: t.contactSection.address,
      description: 'Таллинн, Эстония',
      color: 'bg-primary-yellow'
    },
    {
      icon: Clock,
      title: 'Рабочие часы',
      value: t.contact.hours,
      description: 'Понедельник - Пятница',
      color: 'bg-primary-blue'
    }
  ];

  const officeHours = [
    { day: 'Понедельник', hours: '9:00 - 17:00' },
    { day: 'Вторник', hours: '9:00 - 17:00' },
    { day: 'Среда', hours: '9:00 - 17:00' },
    { day: 'Четверг', hours: '9:00 - 17:00' },
    { day: 'Пятница', hours: '9:00 - 17:00' },
    { day: 'Суббота', hours: 'Закрыто' },
    { day: 'Воскресенье', hours: 'Закрыто' }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-blue to-primary-green text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.contactSection.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light">
              {t.contactSection.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Способы связи
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Выберите удобный способ связи с нами
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center animate-slide-up bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-blue/20 transition-all duration-300">
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">{method.title}</h3>
                <p className="text-lg font-medium text-primary-blue mb-2">{method.value}</p>
                <p className="text-black text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Режим работы
              </h2>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-black">{schedule.day}</span>
                      <span className={`${schedule.hours === 'Закрыто' ? 'text-red-500' : 'text-primary-blue'} font-medium`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="animate-bounce-in">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Быстрый контакт
              </h2>
              <div className="bg-white rounded-2xl p-8 border-2 border-primary-blue shadow-xl">
                <div className="flex items-center mb-6">
                  <MessageCircle className="h-8 w-8 mr-3 text-primary-blue" />
                  <h3 className="text-2xl font-bold text-black">Есть вопросы?</h3>
                </div>
                <p className="text-lg mb-6 text-black">
                  Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь 
                  и ответить на ваши вопросы.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary-blue" />
                    <span className="font-medium text-black">{t.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary-blue" />
                    <span className="font-medium text-black">{t.contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-primary-blue" />
                    <span className="font-medium text-black">{t.contactSection.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactSection />

        <EnhancedFooter />
      </div>
    </div>
  );
}