import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Send,
  Users,
  Building,
  Globe
} from 'lucide-react';

export function EnhancedFooter() {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Спасибо за подписку!',
      description: 'Вы успешно подписались на нашу рассылку.',
    });
    
    setEmail('');
    setIsSubscribing(false);
  };

  const companyStats = [
    { icon: Users, label: 'Специалистов трудоустроено', value: '5000+' },
    { icon: Building, label: 'Компаний-партнеров', value: '500+' },
    { icon: Globe, label: 'Лет на рынке', value: '10+' }
  ];

  const quickLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Услуги', href: '/services' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/contact' }
  ];

  const services = [
    'Аренда рабочей силы',
    'Рекрутинг',
    'Трудовое посредничество',
    'Консультации'
  ];

  return (
    <footer className="bg-gradient-to-br from-dark-gray to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4 text-primary-blue">{t.logo}</h3>
              <p className="text-black mb-6 text-lg leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>
            
            {/* Company Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary-blue mb-1">{stat.value}</div>
                  <div className="text-black text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center hover:bg-primary-green transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center hover:bg-primary-green transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center hover:bg-primary-green transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links & Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-primary-blue">Быстрые ссылки</h4>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-black hover:text-primary-blue transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h4 className="text-xl font-semibold mb-6 text-primary-green">Услуги</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-black">{service}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-primary-yellow">Контакты</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-blue mt-1 mr-3 flex-shrink-0" />
                <span className="text-black">{t.contactSection.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary-blue mr-3" />
                <span className="text-black">{t.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary-blue mr-3" />
                <span className="text-black">{t.contact.email}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary-blue mr-3" />
                <span className="text-black">{t.contact.hours}</span>
              </div>
            </div>
            

          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-white mb-2">Наше расположение</h4>
            <p className="text-gray-300">Посетите нас в самом сердце Таллинна</p>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-gray-700 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary-blue mx-auto mb-4" />
              <p className="text-white font-semibold">Väike-Paala 1, 11415 Tallinn</p>
              <p className="text-gray-300">Эстония</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t.footer.rights}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}