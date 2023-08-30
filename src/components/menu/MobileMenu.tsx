import {useTranslations} from 'next-intl';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MobileMenuItem from './MobileMenuItem';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations('Menu');
  const selectedLanguageKey = 'selectedLanguage';
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(selectedLanguageKey) || 'PT';
    }
    return 'PT';
  });

  const languageOptions = [
    { label: 'PT', value: 'PT' },
    { label: 'EN', value: 'EN' },
    { label: 'ES', value: 'ES' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(selectedLanguageKey);
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    }
  }, []);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setLanguageMenuOpen(false);

    if (typeof window !== 'undefined') {
      localStorage.setItem(selectedLanguageKey, language);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <MobileMenuItem href="/" text={t('home')} />
                <MobileMenuItem href="/clima" text={t('weather')} />
                <MobileMenuItem href="/cep" text={t('zip-code')} />
              </div>
            </div>
            <div className="flex justify-end items-center mt-6">
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="inline-flex rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray-50"
                >
                  {selectedLanguage}
                </button>
                {languageMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {languageOptions.map(({ label, value }) => (
                        <button
                          key={value}
                          onClick={() => handleLanguageChange(value)}
                          className="block w-full text-center px-4 py-2 text-sm text-black hover:bg-gray-500"
                          role="menuitem"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
