"use client"

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';
import Link from 'next/link';
import WelcomeForm from '@/components/form/WelcomeForm';
import Menu from '@/components/menu/Menu';

interface FormData {
  name: string;
}

export default function Home() {
  const t = useTranslations('Index');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    const currentPath = window.location.pathname;

    const storedName = localStorage.getItem('submittedName');
    if (storedName) {
      setSubmittedName(storedName);
    } else {
      setIsModalOpen(true);
    }

    if (selectedLanguage && !currentPath.startsWith('/' + selectedLanguage)) {
      window.location.href = `/${selectedLanguage}`;
    }
  }, []);

  const handleFormSubmit = (formData: FormData) => {
    localStorage.setItem('submittedName', formData.name);
    setSubmittedName(formData.name);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed min-w-full max-w-full">
        <Menu />
        <div className="flex justify-center mt-20">
          <div className="flex-col p-6 max-w-md text-center">
            <h1 className="font-bold text-3xl mb-10">{t('hello')} {submittedName}!</h1>
            <p className="text-2xl mb-10">{t('welcome')}</p>
            <Link href="/clima" className="mr-2">
              <Button type="button" label={t('weather')} />
            </Link>
            <Link href="/cep">
              <Button type="button" label={t('cep')} />
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black p-6 rounded-lg max-w-md">
            <WelcomeForm onSubmit={handleFormSubmit} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
