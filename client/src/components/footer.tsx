import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-dark-gray text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold mb-2">{t.logo}</div>
            <p className="text-gray-300">{t.footer.tagline}</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
