import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Upload, Phone } from 'lucide-react';

export function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToContact = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-green-500/70 to-blue-600/80"></div>
      
      {/* Modern floating elements */}
      <div className="absolute top-1/4 left-16 w-24 h-24 bg-white/20 rounded-2xl rotate-12 animate-float backdrop-blur-sm"></div>
      <div className="absolute bottom-1/4 right-16 w-32 h-32 bg-white/15 rounded-full animate-float backdrop-blur-sm" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/25 rounded-xl -rotate-12 animate-float backdrop-blur-sm" style={{animationDelay: '3s'}}></div>
      <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-white/20 rounded-full animate-float backdrop-blur-sm" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white animate-fade-in drop-shadow-2xl">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto font-light text-white/95 animate-slide-up drop-shadow-lg">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-bounce-in">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-lg px-12 py-7 rounded-full shadow-2xl font-semibold border-0"
              onClick={scrollToContact}
            >
              <Upload className="mr-3 h-6 w-6" />
              {t.hero.submitCv}
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-lg px-12 py-7 rounded-full shadow-2xl font-semibold backdrop-blur-sm"
              onClick={() => window.location.href = `tel:${t.contact.phone}`}
            >
              <Phone className="mr-3 h-6 w-6" />
              {t.hero.callUs}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Modern scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
