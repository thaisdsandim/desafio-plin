"use client";

import React, { useEffect } from 'react';
import API_CONFIG from '@/utils/apiConfig';

export default function Clima() {

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_CONFIG.climaApi}`, {
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Clima:', data);
      } else {
        console.error('Erro ao buscar CEP:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
    </div>
  );
}
