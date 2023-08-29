"use client"

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

interface FormData {
  name: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('submittedName');
    if (storedName) {
      setSubmittedName(storedName);
    } else {
      setIsModalOpen(true);
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
    <main>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="flex-col p-6 max-w-md text-center">
          <h1 className="font-bold text-3xl mb-10">Olá, {submittedName}!</h1>
          <p className="text-2xl mb-10">O que deseja fazer?</p>
          <Link href="/clima" className="mr-2">
            <Button type="button" label="Ver o clima" />
          </Link>
          <Link href="/cep">
            <Button type="button" label="Buscar CEP" />
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black p-6 rounded-lg max-w-md">
            <ContactForm onSubmit={handleFormSubmit} onClose={closeModal} />
          </div>
        </div>
      )}
    </main>
  );
}
