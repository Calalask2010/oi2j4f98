import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown } from 'lucide-react';

export function Header() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (id: string) => {
    if (location !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const isActive = (path: string) => location === path;

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={mobile ? 'flex flex-col space-y-4' : 'hidden lg:flex space-x-1 xl:space-x-2'}>
      <Link 
        href="/"
        className={`px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium text-sm lg:text-base whitespace-nowrap ${
          isActive('/') ? 'text-blue-600 bg-blue-50' : ''
        }`}
      >
        {t.nav.home}
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={`px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium text-sm lg:text-base whitespace-nowrap ${
              isActive('/services') ? 'text-blue-600 bg-blue-50' : ''
            }`}
          >
            {t.nav.services}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
          <DropdownMenuItem asChild>
            <Link href="/services" className="w-full text-gray-700 hover:text-blue-600 hover:bg-blue-50">{t.nav.allServices}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
            {t.nav.workforceRental}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
            {t.nav.recruiting}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
            {t.nav.laborMediation}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link 
        href="/about"
        className={`px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium text-sm lg:text-base whitespace-nowrap ${
          isActive('/about') ? 'text-blue-600 bg-blue-50' : ''
        }`}
      >
        {t.nav.about}
      </Link>
    </nav>
  );

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-green-600 transition-all duration-300 transform hover:scale-105">
              {t.logo}
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="flex-1 flex justify-center">
            <NavLinks />
          </div>
          
          {/* Language & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            
            {/* Mobile menu */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-4">
                    <NavLinks mobile />
                    <div className="pt-4 border-t border-gray-200">
                      <LanguageSwitcher />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}