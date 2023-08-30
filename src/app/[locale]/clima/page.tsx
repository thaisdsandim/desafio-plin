"use client"

import { useState, useEffect } from "react";
import {useTranslations} from 'next-intl';
import { saveLocationToLocalStorage, getLocationFromLocalStorage, getCurrentLocation } from '@/utils/geolocation';
import API_CONFIG from '@/utils/apiConfig';
import Card from "@/components/Card";
import Menu from "@/components/menu/Menu";

export default function Clima() {
  const t = useTranslations('Weather');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const API_key = '740b51449f1806cbf2f3ceddc1e9cce9';

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    const currentPath = window.location.pathname;

    if (selectedLanguage && !currentPath.startsWith('/' + selectedLanguage + '/clima')) {
      window.location.href = `/${selectedLanguage}/clima`;
    }

    const storedLocation = getLocationFromLocalStorage();
    if (storedLocation.latitude && storedLocation.longitude) {
      setLatitude(parseFloat(storedLocation.latitude));
      setLongitude(parseFloat(storedLocation.longitude));
      handleSearch(parseFloat(storedLocation.latitude), parseFloat(storedLocation.longitude));
    } else {
      getCurrentLocation()
        .then(position => {
          setLatitude(position.latitude);
          setLongitude(position.longitude);
          saveLocationToLocalStorage(position.latitude, position.longitude);
          handleSearch(position.latitude, position.longitude);
        })
        .catch(error => {
          console.error('Error getting location:', error);
        });
    }
  }, []);  

  const handleSearch = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`${API_CONFIG.climaApi}lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`, {
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error('Erro ao buscar a localização:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar a localização:', error);
    }
  };

  return (
    <>
      <Menu />
      <div>
        {latitude === null || longitude === null ? (
          <p className="text-center mt-40">{t('error-message')}</p>
        ) : (
          <Card weatherData={weatherData} />
        )}
      </div>
    </>
  );
}
