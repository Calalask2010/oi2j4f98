import { useLanguage, Language } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-md">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-sm font-medium">{currentLanguage?.name}</span>
          <span className="sm:hidden text-lg">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`transition-all duration-200 ${
              language === lang.code 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
