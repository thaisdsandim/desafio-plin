"use client"

import { useState } from 'react';
import Input from './form/Input';
import FileInput from './form/FileInput';
import Button from './Button';

interface ContactFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

interface FormData {
  name: string;
  file: File | null;
}

export default function Form({ onSubmit, onClose }: ContactFormProps) {
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
      <p className="text-white font-bold text-lg mb-4">Entre em contato conosco:</p>
      <Input
        id="name"
        label="Nome*"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required={true}
      />
      <Input
        id="email"
        label="E-mail"
        type="text"
        name="email"
        value=""
        onChange={handleInputChange}
        required={false}
      />
      <FileInput id="file" label="Arquivo (apenas PDF)" onFileChange={handleFileChange} />
      <Button type="submit" label="Enviar" />
    </form>
  );
};
