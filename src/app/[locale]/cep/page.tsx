"use client"

import { useState, useEffect, ChangeEvent } from 'react';
import {useTranslations} from 'next-intl';
import API_CONFIG from '@/utils/apiConfig';
import Input from '@/components/form/Input';
import SearchResult from '@/components/SearchResult';
import Menu from '@/components/menu/Menu';
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
  const t = useTranslations('CEP');
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
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    const currentPath = window.location.pathname;

    if (selectedLanguage && !currentPath.startsWith('/' + selectedLanguage + '/cep')) {
      window.location.href = `/${selectedLanguage}/cep`;
    }

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
          <h1 className="text-2xl font-semibold mb-4">{t('search')}</h1>
          <div className="flex items-center justify-between max-w-full">
            <div className="flex-wrap min-w-[49%]">
              <Input
                id="street"
                label={t('street')}
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
                label={t('number')}
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
                label={t('city')}
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
                label={t('state')}
                type="text"
                name="state"
                value={state}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <button onClick={handleClearFields} className="bg-white hover:bg-gray-500 text-black font-bold py-2 px-4 mt-2 rounded">{t('clean')}</button>
        </div>
        <SearchResult results={searchResults} />
      </div>
    </>
  );
}
  