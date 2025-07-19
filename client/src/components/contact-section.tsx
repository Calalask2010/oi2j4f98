import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t.contactSection.form.success,
        variant: 'default',
      });
      setFormData({ name: '', email: '', message: '' });
    },
    onError: () => {
      toast({
        title: t.contactSection.form.error,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      submitContactMutation.mutate(formData);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contacts" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900 relative overflow-hidden">
      {/* Geometric decorative elements matching About page */}
      <div className="absolute top-20 left-20 w-28 h-28 bg-blue-200/40 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-20 h-20 bg-purple-200/40 rounded-2xl rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-32 w-16 h-16 bg-green-200/40 rounded-xl -rotate-12 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-200/40 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-indigo-200/40 rounded-lg rotate-12 animate-float" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute top-1/3 right-10 w-14 h-14 bg-cyan-200/40 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Свяжитесь с нами
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t.contactSection.title}</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            {t.contactSection.subtitle}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                Контактная информация
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">{t.contactSection.info}</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Адрес офиса</h4>
                  <span className="text-gray-700">{t.contactSection.address}</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Телефон</h4>
                  <span className="text-gray-700">{t.contact.phone}</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Электронная почта</h4>
                  <span className="text-gray-700">{t.contact.email}</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Время работы</h4>
                  <span className="text-gray-700">{t.contactSection.workingHours}</span>
                </div>
              </div>
            </div>
            
            {/* Additional contact info */}
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
              <h4 className="font-bold text-gray-900 mb-4">Почему выбирают нас?</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm">Быстрое реагирование на запросы</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm">Индивидуальный подход к каждому клиенту</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm">Многолетний опыт и экспертиза</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
                Отправить сообщение
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">{t.contactSection.form.title}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя
                </label>
                <Input
                  type="text"
                  placeholder={t.contactSection.form.name}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-4 rounded-xl text-gray-900 bg-gradient-to-br from-gray-50 to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 hover:border-blue-300 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Электронная почта
                </label>
                <Input
                  type="email"
                  placeholder={t.contactSection.form.email}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-4 rounded-xl text-gray-900 bg-gradient-to-br from-gray-50 to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 hover:border-blue-300 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше сообщение
                </label>
                <Textarea
                  rows={5}
                  placeholder={t.contactSection.form.message}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-4 rounded-xl text-gray-900 bg-gradient-to-br from-gray-50 to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 hover:border-blue-300 transition-all duration-300 resize-none"
                  required
                />
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Мы отвечаем на все сообщения в течение 24 часов
                </p>
                <Button
                  type="submit"
                  disabled={submitContactMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {submitContactMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Отправка...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Mail className="w-5 h-5 mr-2" />
                      {t.contactSection.form.submit}
                    </div>
                  )}
                </Button>
              </div>
            </form>
            
            {/* Success message area */}
            <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 text-center">
                💼 Готовы к сотрудничеству? Расскажите нам о своих потребностях!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
