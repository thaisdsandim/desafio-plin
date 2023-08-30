"use client"

import { useState, useEffect, ChangeEvent } from 'react';
import API_CONFIG from '@/utils/apiConfig';
import Input from '@/components/form/Input';
import SearchResult from '@/components/SearchResult';
import Menu from '@/components/menu/Menu';
import Button from '@/components/Button';
const API_key = 'AIzaSyDII5CXTv71DjVo32ljwao_uBSODSj6vMk';

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
interface SearchResultProps {
  results: {
    address_components: AddressComponent[];
    formatted_address: string;
  }[];
}

export default function Cep() {
  const [street, setStreet] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResultProps['results']>([]);

  const handleSearch = async () => {
    const term = `${street}, ${number}, ${city}, ${state}`;
    
    try {
      const response = await fetch(`${API_CONFIG.cepApi}=${term}&key=${API_key}`, {
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
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
    if (street || number || city || state) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [street, number, city, state]);

  const handleClearFields = () => {
    setStreet('');
    setNumber('');
    setCity('');
    setState('');
    setSearchResults([]);
  };

  return (
    <>
      <Menu />
      <div className="p-4 text-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Busca de CEP por Endereço</h1>
          <div className="flex items-center justify-between max-w-full">
            <div className="flex-wrap min-w-[49%]">
              <Input
                id="street"
                label="Rua:"
                type="text"
                name="street"
                value={street}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex-wrap min-w-[49%]">
              <Input
                id="number"
                label="Número:"
                type="text"
                name="number"
                value={number}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <div className="flex justify-between items-center max-w-full">
            <div className="flex-wrap min-w-[49%]">
              <Input
                id="city"
                label="Cidade:"
                type="text"
                name="city"
                value={city}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex-wrap min-w-[49%]">
              <Input
                id="state"
                label="Estado:"
                type="text"
                name="state"
                value={state}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <button onClick={handleClearFields} className="bg-white hover:bg-gray-500 text-black font-bold py-2 px-4 mt-2 rounded">Limpar Campos</button>
        </div>
        <SearchResult results={searchResults} />
      </div>
    </>
  );
}
  