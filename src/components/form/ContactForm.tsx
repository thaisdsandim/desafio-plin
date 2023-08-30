"use client"

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Input from './Input';
import FileInput from './FileInput';
import Button from '../Button';
import validator from 'validator';

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const [emailError, setEmailError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'email') {
      setEmailError('');
    }
  };

  const handleFileChange = (file: any) => {
    setFormData((prevData) => ({ ...prevData, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validator.isEmail(formData.email)) {
      setEmailError('Endereço de email inválido');
      return;
    }

    console.log('Dados do formulário:', formData);

    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      message: '',
      file: null,
    });
    setEmailError('');
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <p className="text-white font-bold text-lg mb-2 text-center">{t('title')}</p>
      <Input
        id="name"
        label={t('name')}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required={true}
      />
      <Input
        id="email"
        label={t('email')}
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required={true}
      />
      {emailError && <p className="text-red-500 mb-2">{t('email-error')}</p>}
      <Input
        id="message"
        label={t('message')}
        type="text"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        required={true}
      />
      <FileInput
        id="file"
        label={t('file')}
        onFileChange={handleFileChange}
      />
      <Button type="submit" label={t('submit')} />
      {formSubmitted && <p className="text-green-500">{t('form-submitted')}</p>}
    </form>
  );
}
