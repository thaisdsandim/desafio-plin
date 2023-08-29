import { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import Logo from './Logo';
import MobileMenuButton from './MobileMenuButton';
import NavItem from './NavItem';
import MobileMenu from './MobileMenu';

export default function Menu() {
  const selectedLanguageKey = 'selectedLanguage';
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(selectedLanguageKey) || 'PT-BR';
    }
    return 'PT-BR';
  });    

  const handleMobileMenuOpen = () => setMobileMenuOpen(true);
  const handleMobileMenuClose = () => setMobileMenuOpen(false);
  const handleLanguageMenuOpen = () => setLanguageMenuOpen(true);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setLanguageMenuOpen(false);
  
    if (typeof window !== 'undefined') {
      localStorage.setItem(selectedLanguageKey, language);
    }
  };  

  useEffect(() => {
    const savedLanguage = localStorage.getItem(selectedLanguageKey);
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  return (
    <header className="bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <MobileMenuButton onClick={handleMobileMenuOpen} />
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <NavItem href="/" text="Página Inicial" />
          <NavItem href="/clima" text="Clima" />
          <NavItem href="/cep" text="Consulta CEP" />
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover className="relative">
            {({ open }: { open: boolean }) => (
              <>
                <Popover.Button onClick={handleLanguageMenuOpen} className="text-sm font-semibold leading-6 text-white">
                  {selectedLanguage} <span aria-hidden="true">&darr;</span>
                </Popover.Button>
                <Popover.Panel
                  className={`${
                    isLanguageMenuOpen && open ? 'block' : 'hidden'
                  } origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleLanguageChange('PT-BR')}
                      className={`${
                        selectedLanguage === 'PT-BR' ? 'text-indigo-600' : 'text-gray-900'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      PT-BR
                    </button>
                    <button
                      onClick={() => handleLanguageChange('EN')}
                      className={`${
                        selectedLanguage === 'EN' ? 'text-indigo-600' : 'text-gray-900'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => handleLanguageChange('ES')}
                      className={`${
                        selectedLanguage === 'ES' ? 'text-indigo-600' : 'text-gray-900'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      ES
                    </button>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      </nav>
      <MobileMenu open={isMobileMenuOpen} onClose={handleMobileMenuClose} />
    </header>
  );
}
