"use client"

import { useState, useEffect, ChangeEvent } from 'react';
import API_CONFIG from '@/utils/apiConfig';
import Input from '@/components/form/Input';
import SearchResult from '@/components/SearchResult';
import Menu from '@/components/Menu';

export default function Cep() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
  }[]>([]);

  const handleSearch = async (term: string) => {
    try {
      const response = await fetch(`${API_CONFIG.cepApi}/${term}`, {
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Erro ao buscar CEP:', response.status);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      handleSearch(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      <Menu />
      <div className="p-4 text-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Busca de CEP por Endereço</h1>
          <Input
            id="text"
            label="Digite o endereço:"
            type="text"
            name="text"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            required={false}
          />
        </div>
        <SearchResult results={searchResults} />
      </div>
    </>
  );
}
