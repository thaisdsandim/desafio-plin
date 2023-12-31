"use client"

import { useState } from 'react';
import {useTranslations} from 'next-intl';
import Input from './Input';
import Button from '../Button';

interface ContactFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

interface FormData {
  name: string;
  file: File | null;
}

export default function Form({ onSubmit, onClose }: ContactFormProps) {
  const t = useTranslations('WelcomeForm');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    file: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({ ...prevData, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    onSubmit(formData);
    onClose();
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <p className="text-white font-bold text-lg mb-2">{t('title')}</p>
      <Input
        id="name"
        label={t('name')}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required={true}
      />
      <Button type="submit" label={t('submit')} />
    </form>
  );
};
